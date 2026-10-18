from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.db.models import Avg
from decimal import Decimal

from recipes.models import (Recipe, RecipeIngredient, ShopLstRecipe, ShoppingLst, 
                            RecipeImage, RecipeCommentImage, RecipeComment, 
                            RecipeCommentVideo, RecipeStep, RecipeRating)
from recipes.serializers import (RecipeSerializer, RecipeIngredientSerializer,
                                 ShoppingLstSerializer, RecipeCommentSerializer, RecipeStepSerializer, 
                                 RecipeCommentImageSerializer,
                                 RecipeImageSerializer, RecipeCommentVideoSerializer,
                                 ShopListRecipeAddSerializer, ShopListEditRecipeSerializer,
                                 ShopListDeleteRecipeSerializer, RecipeCopySerializer, RecipeIngredientSerializer,
                                 ShopListRecipeSerializer)
from rest_framework import serializers
from recipes.permissions import LstOwner, RecipeOwner


# Create your views here.
# TODO: Remember token authentication!
## https://www.django-rest-framework.org/api-guide/authentication/

class RecipesView(ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Recipe.objects.all().order_by('id')

class AddRecipeImageView(CreateAPIView, DestroyAPIView):
    serializer_class = RecipeImageSerializer
    permission_classes = [IsAuthenticated, RecipeOwner]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        return get_object_or_404(RecipeImage, id=self.kwargs['image_id'], recipe=recipe)

class RecipeCopyView(CreateAPIView):
    serializer_class = RecipeCopySerializer
    permission_classes = [IsAuthenticated]


class RecipeView(RetrieveAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return get_object_or_404(Recipe, id=self.kwargs['recipe_id'])

class RecipeIngredientsView(ListAPIView):
    serializer_class = RecipeIngredientSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return RecipeIngredient.objects.filter(recipe=get_object_or_404(Recipe, id=self.kwargs['recipe_id'])).order_by('id')

class RecipeIngredientView(CreateAPIView, UpdateAPIView, DestroyAPIView):
    serializer_class = RecipeIngredientSerializer
    permission_classes = [IsAuthenticated, RecipeOwner]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        return get_object_or_404(RecipeIngredient, id=self.kwargs['ingredient_id'], recipe=recipe)

class AddRecipeView(CreateAPIView):  
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

class EditRecipeView(UpdateAPIView, DestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated, RecipeOwner]

    def get_object(self):
        return get_object_or_404(Recipe, id=self.kwargs['recipe_id'])

def community_state(recipe, user):
    """Counts shown to everyone, plus this user's own like / favourite / rating."""
    my_rating = recipe.ratings.filter(user=user).values_list('score', flat=True).first()
    return {
        'likes': recipe.likes,
        'favourited': recipe.favourited,
        'star_rating': float(recipe.star_rating),
        'rating_count': recipe.ratings.count(),
        'liked': user.likes.filter(pk=recipe.pk).exists(),
        'is_favourite': user.favourites.filter(pk=recipe.pk).exists(),
        'my_rating': my_rating,
        'can_rate': recipe.owner_id != user.id,
    }


def recount_community(recipe):
    """Recalculate the cached counts / mean from the per-user data."""
    recipe.likes = recipe.liker.count()
    recipe.favourited = recipe.favourites.count()
    mean = recipe.ratings.aggregate(mean=Avg('score'))['mean']
    recipe.star_rating = round(Decimal(mean), 2) if mean is not None else 0
    recipe.save(update_fields=['likes', 'favourited', 'star_rating'])


class RecipeCommunityView(APIView):
    """GET: the logged-in user's like / favourite / rating state for a recipe."""
    permission_classes = [IsAuthenticated]

    def get(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        return Response(community_state(recipe, request.user))


class _ToggleView(APIView):
    """POST adds the recipe to the user's relation, DELETE removes it. Both are idempotent."""
    permission_classes = [IsAuthenticated]
    relation = None  # name of the User many-to-many field

    def _apply(self, request, recipe_id, add):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        with transaction.atomic():
            related = getattr(request.user, self.relation)
            if add:
                related.add(recipe)
            else:
                related.remove(recipe)
            recount_community(recipe)
        return Response(community_state(recipe, request.user))

    def post(self, request, recipe_id):
        return self._apply(request, recipe_id, add=True)

    def delete(self, request, recipe_id):
        return self._apply(request, recipe_id, add=False)


class LikeRecipeView(_ToggleView):
    relation = 'likes'


class FavRecipeView(_ToggleView):
    relation = 'favourites'


class RateRecipeView(APIView):
    """POST {"score": 0-5} sets the user's rating; DELETE removes it."""
    permission_classes = [IsAuthenticated]

    def post(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        if recipe.owner_id == request.user.id:
            return Response({'score': ["You can't rate your own recipe."]}, status=status.HTTP_403_FORBIDDEN)
        score = request.data.get('score')
        if isinstance(score, bool) or not isinstance(score, int) or not 0 <= score <= 5:
            return Response({'score': ['Score must be a whole number from 0 to 5.']}, status=status.HTTP_400_BAD_REQUEST)
        with transaction.atomic():
            RecipeRating.objects.update_or_create(user=request.user, recipe=recipe, defaults={'score': score})
            request.user.rated.add(recipe)
            recount_community(recipe)
        return Response(community_state(recipe, request.user))

    def delete(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        with transaction.atomic():
            RecipeRating.objects.filter(user=request.user, recipe=recipe).delete()
            request.user.rated.remove(recipe)
            recount_community(recipe)
        return Response(community_state(recipe, request.user))


class RecipeCommentView(CreateAPIView, UpdateAPIView):
    serializer_class = RecipeCommentSerializer
    permission_classes = [IsAuthenticated]

class RecipeCommentImageView(CreateAPIView, DestroyAPIView):
    serializer_class = RecipeCommentImageSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        comment = get_object_or_404(RecipeComment, id=self.kwargs['comment_id'], recipe=recipe)
        return get_object_or_404(RecipeCommentImage, id=self.kwargs['image_id'], comment=comment)

class RecipeCommentVideoView(CreateAPIView, DestroyAPIView):
    serializer_class = RecipeCommentVideoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        comment = get_object_or_404(RecipeComment, id=self.kwargs['comment_id'], recipe=recipe)
        return get_object_or_404(RecipeCommentVideo, id=self.kwargs['video_id'], comment=comment)

class RecipeStepView(CreateAPIView):
    serializer_class = RecipeStepSerializer
    permission_classes = [IsAuthenticated, RecipeOwner]


class EditRecipeStepView(UpdateAPIView, DestroyAPIView):
    serializer_class = RecipeStepSerializer
    permission_classes = [IsAuthenticated, RecipeOwner]

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs['recipe_id'])
        return get_object_or_404(RecipeStep, id=self.kwargs['step_id'], recipe=recipe)

class ShoppingListView(RetrieveAPIView):
    serializer_class = ShoppingLstSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(ShoppingLst, owner=self.request.user)

class ShopListViewRecipeView(RetrieveAPIView):
    serializer_class = ShopListRecipeSerializer
    permission_classes = [IsAuthenticated, LstOwner]

    def get_object(self):
        return get_object_or_404(ShopLstRecipe, id=self.kwargs['pk'])

class ShopListAddRecipeView(CreateAPIView):
    queryset = ShopLstRecipe.objects.all()
    serializer_class = ShopListRecipeAddSerializer
    permission_classes = [IsAuthenticated]

class ShopListEditRecipeView(UpdateAPIView):
    queryset = ShopLstRecipe.objects.all()
    serializer_class = ShopListEditRecipeSerializer
    permission_classes = [IsAuthenticated, LstOwner]

class ShopListDeleteRecipeView(DestroyAPIView):
    queryset = ShopLstRecipe.objects.all()
    serializer_class = ShopListDeleteRecipeSerializer
    permission_classes = [IsAuthenticated, LstOwner]

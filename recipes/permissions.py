from django.shortcuts import get_object_or_404
from rest_framework import permissions

from recipes.models import Recipe

class LstOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """
        obj is a <ShopLstRecipe>
        """
        user = request.user
        if user == obj.lst.owner:
            return True
        return False

class RecipeOwner(permissions.BasePermission):
    """
    Only the owner of the recipe named by the URL's <recipe_id> may use the view.
    Checked per request (not per object) so it also covers creating new
    images, ingredients and steps. A missing recipe gives a 404.
    """
    message = "Only the recipe's owner can change it."

    def has_permission(self, request, view):
        recipe = get_object_or_404(Recipe, id=view.kwargs['recipe_id'])
        return recipe.owner_id == request.user.id

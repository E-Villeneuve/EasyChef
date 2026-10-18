from rest_framework import serializers

import accounts.models
from recipes.models import (Recipe, RecipeIngredient, 
                            RecipeStep, RecipeComment, 
                            RecipeCommentImage, ShopLstRecipe, ShoppingLst,
                            RecipeImage, RecipeCommentVideo, Diets)

from recipes.helpers import (collect_ingredients, collect_ingredients_x, ingredient_totals,
                             format_ingredients, get_pic_rep)
from django.shortcuts import get_object_or_404
from django.db import transaction
from datetime import datetime

DECIMAL_PLACES = 2

class RecipeCopySerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.email', read_only=True)
    name = serializers.ReadOnlyField()
    description = serializers.ReadOnlyField()
    servings = serializers.ReadOnlyField()
    cook_time = serializers.ReadOnlyField()
    prep_time = serializers.ReadOnlyField()
    cuisine = serializers.ReadOnlyField()
    star_rating = serializers.ReadOnlyField()
    likes = serializers.ReadOnlyField()
    favourited = serializers.ReadOnlyField()

    class Meta:
        model = Recipe
        fields = '__all__'
    
    def create(self, validated_data):
        recipe = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe)
        n = {}
        n['owner'] = self.context['request'].user
        if 'name' not in validated_data:
            n['name'] = recipe.name
        if 'description' not in validated_data:
            n['description'] = recipe.description
        if 'cookingtimetag' not in validated_data:
            n['cookingtimetag'] = recipe.cookingtimetag
        if 'servings' not in validated_data:
            n['servings'] = recipe.servings
        if 'cuisine' not in validated_data:
            n['cuisine'] = recipe.cuisine
        if 'prep_time' not in validated_data:
            n['prep_time'] = recipe.prep_time
        if 'cook_time' not in validated_data:
            n['cook_time'] = recipe.cook_time
        new_recipe = super().create(validated_data | n)
        for step in recipe.steps.all():
            new_step = RecipeStep(description=step.description, step_num=step.step_num, date_created=datetime.now(),recipe=new_recipe)
            new_step.save()
        for ingredient in recipe.ingredients.all():
            new_ingredient = RecipeIngredient(recipe = new_recipe, name = ingredient.name, quantity=ingredient.quantity, unit=ingredient.unit)
            new_ingredient.save()
        for image in recipe.images.all():
            new_image = RecipeImage(recipe = new_recipe, image = image.image)
            new_image.save()
        return new_recipe

    def get_ingredients(self, instance):
        return collect_ingredients(instance)
    
    def get_steps(self, instance):
        steps = {}
        for step in instance.steps.all().order_by('step_num'):
            steps[f"{step.step_num}"] = step.description
        return steps

    def get_images(self, instance):
        images = {}
        for image in instance.images.all():
            images[f"{image.id}"] = image.image.url
        return images
    
    def get_videos(self, instance):
        videos = {}
        for video in instance.videos.all():
            videos[f"{video.id}"] = video.video.url
        return videos
    
    def get_comments(self,instance):
        comments = {}
        for comment in instance.comments.all():
            curr_comment = {}
            curr_comment["description"] = comment.description
            curr_comment["owner"] = comment.owner.email
            curr_comment["owner_name"] = f"{comment.owner.first_name} {comment.owner.last_name}"
            curr_comment["owner_avatar"] = comment.owner.avatar.url if comment.owner.avatar else None
            curr_comment["images"] = self.get_images(comment)
            curr_comment["videos"] = self.get_videos(comment)
            comments[f'{comment.id}'] = curr_comment
        return comments
    
    def to_representation(self, instance):
        orig_rep = super().to_representation(instance)
        rep = {
            'Recipe Details': orig_rep,
            'Ingredients': self.get_ingredients(instance),
            'Instructions': self.get_steps(instance),
            'Images': self.get_images(instance),
            'Comments': self.get_comments(instance)
        }
        return rep

class IngredientInputSerializer(serializers.Serializer):
    # Mirrors RecipeIngredient's name / quantity / unit constraints
    name = serializers.CharField(max_length=255)
    quantity = serializers.DecimalField(max_digits=7, decimal_places=2, min_value=0)
    unit = serializers.ChoiceField(choices=RecipeIngredient.Units.choices, default=RecipeIngredient.Units.GRAM)

class RecipeSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.email', read_only=True)
    owner_display_name = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()
    star_rating = serializers.ReadOnlyField()
    likes = serializers.ReadOnlyField()
    favourited = serializers.ReadOnlyField()
    # MultiSelectField would otherwise map to a single-value ChoiceField
    diets = serializers.MultipleChoiceField(choices=Diets.choices, required=False)
    # Optional: when given, these replace all of the recipe's ingredients / steps
    ingredient_list = IngredientInputSerializer(many=True, write_only=True, required=False)
    step_list = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)

    class Meta:
        model = Recipe
        fields = '__all__'

    def get_rating_count(self, instance):
        return instance.ratings.count()

    def get_owner_display_name(self, instance):
        # "First L." - avoids showing the owner's email address
        first = (instance.owner.first_name or '').strip()
        last = (instance.owner.last_name or '').strip()
        if not first:
            return None
        return f"{first} {last[0].upper()}." if last else first

    def _replace_children(self, recipe, ingredient_list, step_list):
        if ingredient_list is not None:
            recipe.ingredients.all().delete()
            RecipeIngredient.objects.bulk_create(
                [RecipeIngredient(recipe=recipe, **ing) for ing in ingredient_list])
        if step_list is not None:
            recipe.steps.all().delete()
            RecipeStep.objects.bulk_create(
                [RecipeStep(recipe=recipe, step_num=num, description=desc)
                 for num, desc in enumerate(step_list, start=1)])

    def create(self, validated_data):
        ingredient_list = validated_data.pop('ingredient_list', None)
        step_list = validated_data.pop('step_list', None)
        with transaction.atomic():
            recipe = super().create(validated_data | {'owner': self.context['request'].user})
            self._replace_children(recipe, ingredient_list, step_list)
        return recipe
    
    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.id != instance.owner.id:
            raise serializers.ValidationError({"authorize": "No Permission"})
        ingredient_list = validated_data.pop('ingredient_list', None)
        step_list = validated_data.pop('step_list', None)
        if 'name' in validated_data:
            instance.name = validated_data['name']
        if 'description' in validated_data:    
            instance.description = validated_data['description']
        if 'star_rating' in validated_data:    
            instance.star_rating = validated_data['star_rating']
        if 'likes' in validated_data:
            instance.likes = validated_data['likes']
        if 'favourited' in validated_data:
            instance.favourited = validated_data['favourited']
        if 'star_rating' in validated_data:
            instance.star_rating = validated_data['star_rating']
        if 'prep_time' in validated_data:
            instance.prep_time = validated_data['prep_time']
        if 'cook_time' in validated_data:
            instance.cook_time = validated_data['cook_time']
        if 'servings' in validated_data:
            instance.servings = validated_data['servings']
        if 'cuisine' in validated_data:
            instance.cuisine = validated_data['cuisine']
        if 'diets' in validated_data:
            instance.diets = list(validated_data['diets'])
        if 'cookingtimetag' in validated_data:
            instance.cookingtimetag = validated_data['cookingtimetag']

        with transaction.atomic():
            instance.save()
            self._replace_children(instance, ingredient_list, step_list)
        return instance    

    def get_ingredients(self, instance):
        return collect_ingredients(instance)
    
    def get_steps(self, instance):
        steps = {}
        for step in instance.steps.all().order_by('step_num'):
            steps[f"{step.step_num}"] = step.description
        return steps
    
    def get_images(self, instance):
        images = {}
        for image in instance.images.all():
            images[f"{image.id}"] = image.image.url
        return images
    
    def get_diets(self, instance):
        diets = []
        for diet in instance.diets.all():
            diets.append(str(diet))
        return diets

    def get_videos(self, instance):
        videos = {}
        for video in instance.videos.all():
            videos[f"{video.id}"] = video.video.url
        return videos
    
    def get_comments(self,instance):
        comments = {}
        for comment in instance.comments.all():
            curr_comment = {}
            curr_comment["description"] = comment.description
            curr_comment["owner"] = comment.owner.email
            curr_comment["owner_name"] = f"{comment.owner.first_name} {comment.owner.last_name}"
            curr_comment["owner_avatar"] = comment.owner.avatar.url if comment.owner.avatar else None
            curr_comment["images"] = self.get_images(comment)
            curr_comment["videos"] = self.get_videos(comment)
            comments[f'{comment.id}'] = curr_comment
        return comments

    def to_representation(self, instance):
        orig_rep = super().to_representation(instance)
        rep = {
            'recipe_details': orig_rep,
            'ingredients': self.get_ingredients(instance),
            'instructions': self.get_steps(instance),
            'images': self.get_images(instance),
            'comments': self.get_comments(instance),
            # Unscaled, editable forms of the ingredients / steps
            'ingredient_list': [{'id': i.id, 'name': i.name, 'quantity': str(i.quantity), 'unit': i.unit}
                                for i in instance.ingredients.all().order_by('id')],
            'step_list': [step.description for step in instance.steps.all().order_by('step_num')],
        }
        return rep

class RecipeImageSerializer(serializers.ModelSerializer):
    recipe = serializers.CharField(source='recipe.id', read_only=True)
    image_url = serializers.ReadOnlyField(source='media_url')
    class Meta:
        model = RecipeImage
        fields = ['id', 'image', 'recipe', 'image_url']
    
    def create(self, validated_data):
        recipe_id = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe_id)
        return super().create(validated_data | {'recipe': recipe})

class RecipeCommentSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.email', read_only=True)
    recipe = serializers.CharField(source='recipe.id', read_only=True)
    class Meta:
        model = RecipeComment
        fields = ['id', 'description','owner', 'recipe']
    
    def create(self, validated_data):
        recipe = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe)
        return super().create(validated_data | {'owner': self.context['request'].user, 'recipe': recipe})

class RecipeCommentImageSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(source='comment.id', read_only=True)
    class Meta:
        model = RecipeCommentImage
        fields = ['id', 'comment', 'image']
    
    def create(self, validated_data):
        comment = self.context['request'].parser_context['kwargs']['comment_id']
        comment = get_object_or_404(RecipeComment, pk=comment)
        return super().create(validated_data | {'comment': comment})

class RecipeCommentVideoSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(source='comment.id', read_only=True)
    class Meta:
        model = RecipeCommentVideo
        fields = ['id', 'comment', 'video']
    
    def create(self, validated_data):
        comment = self.context['request'].parser_context['kwargs']['comment_id']
        comment = get_object_or_404(RecipeComment, pk=comment)
        return super().create(validated_data | {'comment': comment})

class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeStep
        fields = ['id', 'description', 'date_created', 'step_num']

    def create(self, validated_data):
        recipe = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe)
        return super().create(validated_data | {'recipe': recipe})
    
    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.id != instance.recipe.owner.id:
            raise serializers.ValidationError({"authorize": "No Permission"})
        if 'description' in validated_data:
            instance.description = validated_data['description']
        if 'step_num' in validated_data:
            instance.step_num = validated_data['step_num']
        if validated_data:
            instance.date_created = datetime.now()
        
        instance.save()
        return instance

class RecipeIngredientSerializer(serializers.ModelSerializer):
    # replace w/ "RecipeSerializer()" for more info
    recipe = serializers.CharField(source='recipe.name', read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'recipe', 'name', 'quantity', 'unit']
    
    def create(self, validated_data):
        recipe = self.context['request'].parser_context['kwargs']['recipe_id']
        recipe = get_object_or_404(Recipe, pk=recipe)
        return super().create(validated_data | {'recipe': recipe})
    
    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.id != instance.recipe.owner.id:
            raise serializers.ValidationError({"authorize": "No Permission"})
        if 'name' in validated_data:
            instance.name = validated_data['name']
        if 'quantity' in validated_data:
            instance.quantity = validated_data['quantity']
        if 'unit' in validated_data:
            instance.unit = validated_data['unit']
        instance.save()
        return instance

class ShopListRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopLstRecipe
        fields = '__all__'

    def to_representation(self, instance):
        """
        Note: <instance> is the ShoppingLst object
        """
        orig_rep = super().to_representation(instance)
        orig_recipe = instance.original_recipe
        servings = orig_rep.get('serving', None)

        rep = {
            'recipe_name': orig_rep.get('name', None),
            'shoplstrecipe_id': orig_rep.get('id', None),
            'servings': orig_rep.get('serving', None),
            'orig_id': orig_rep.get('original_recipe', None),
            'ingredients': collect_ingredients_x(orig_recipe, servings),
            'pic_rep': get_pic_rep(orig_recipe),
            'cook_time': orig_recipe.cook_time
        }

        return rep
    
class ShoppingLstSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.email')
    recipes = ShopListRecipeSerializer(source='shoplstrecipe_set', many=True)

    class Meta:
        model = ShoppingLst
        fields = '__all__'

    def get_total_ingredients(self, instance):
        # Sum the raw quantities of every recipe on the list (each scaled by
        # its own servings), then format once, so units are never re-parsed
        totals = None
        for recipe in ShopLstRecipe.objects.filter(lst=instance):
            totals = ingredient_totals(recipe.original_recipe, recipe.serving, totals)
        return format_ingredients(totals) if totals else {}

    def to_representation(self, instance):
        """
        Note: <instance> is the ShoppingLst object
        """
        orig_rep = super().to_representation(instance)

        rep = {
            'shop_lst_id': instance.id,
            'shop_lst_owner': orig_rep.get('owner', None),
            'recipes_details': orig_rep.get('recipes', None),
            'total_ingredients': self.get_total_ingredients(instance),
        }

        return rep

class ShopListRecipeAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopLstRecipe
        fields = ['id', 'original_recipe', 'serving']

    def create(self, validated_data):
        if 'original_recipe' in validated_data:
            recipe = validated_data.get('original_recipe', '')
            servings = validated_data.get('serving', recipe.servings)
            instance = ShopLstRecipe.objects.create(original_recipe=recipe, 
                                                    lst=get_object_or_404(ShoppingLst, 
                                                                          owner=self.context['request'].user),
                                                    recipe_owner=recipe.owner, name=recipe.name,
                                                    serving=servings)
            return instance

class ShopListEditRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopLstRecipe
        fields = ['serving']

class ShopListDeleteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopLstRecipe

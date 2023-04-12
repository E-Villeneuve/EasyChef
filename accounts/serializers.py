from rest_framework import serializers
from accounts.models import User
from recipes.serializers import RecipeSerializer
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from recipes.models import Recipe
from recipes.serializers import RecipeSerializer

class UserSerializer(serializers.ModelSerializer):


    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'avatar', 'description',
                  'phone_number', 'is_superuser', 'is_staff', 'last_login',
                  'date_joined', 'favourites', 'rated', 'likes', 'commented']



class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']

    #def validate(self, attrs):
    #    # Maybe add min pass length if necessary
    #    if attrs['password'] != attrs['password2']:
    #        raise serializers.ValidationError({"password2": "Passwords don't match"})
    #    return attrs

    def create(self, validated_data):
        new_user = User.objects.create(email=validated_data['email'], first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        new_user.set_password(validated_data['password'])
        new_user.save()


        return new_user

class AddFavouriteSerializer(serializers.ModelSerializer):

    fav_id = serializers.IntegerField(required=True)

    class Meta:
        model = User
        fields = ['fav_id']

    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.id != instance.id:
            raise serializers.ValidationError({"unauthorized": "No Permission"})
        recipe_id = validated_data['fav_id']
        if not Recipe.objects.filter(id=recipe_id).exists():
            raise serializers.ValidationError({"non-existent": "Recipe does not exist"})

        fav_recipe = Recipe.objects.get(id=recipe_id)
        if instance.favourites.filter(pk=recipe_id).exists():
            instance.favourites.remove(fav_recipe)
            fav_recipe.favourited -= 1
            fav_recipe.save()

        else:
            instance.favourites.add(fav_recipe)
            fav_recipe.favourited += 1
            fav_recipe.save()

        instance.save()
        return instance
        


# Based off this Medium Article:
# https://medium.com/django-rest/django-rest-framework-change-password-and-update-profile-1db0c144c0a3
class EditProfileSerializer(serializers.ModelSerializer):
    #first_name = serializers.CharField(required=False)
    #last_name = serializers.CharField(required=False)
    avatar = serializers.ImageField(required=False)
    #description = serializers.text(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=False)
    

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'avatar', 'description', 'phone_number', 'password']

    def update(self, instance, validated_data):

        user = self.context['request'].user


        if user.id != instance.id:
            raise serializers.ValidationError({"unauthorized": "No Permission"})

        if 'email' in validated_data:
            if User.objects.filter(email = validated_data['email']).exclude(email=user.email).exists():
                raise serializers.ValidationError({"email": "Email must be unique"})
            instance.email = validated_data['email']
        if 'first_name' in validated_data:
            instance.first_name = validated_data['first_name']
        if 'last_name' in validated_data:    
            instance.last_name = validated_data['last_name']
        if 'description' in validated_data:    
            instance.description = validated_data['description']
        if 'phone_number' in validated_data:
            instance.phone_number = validated_data['phone_number']
        if 'avatar' in validated_data:
            instance.avatar = validated_data['avatar'] # Bit iffy about this one, maybe more required for photos

        if 'password' in validated_data:
            if len(validated_data['password']) < 1:
                raise serializers.ValidationError({"password": "password cannot be blank"})
            instance.set_password(validated_data['password'])

        instance.save()
        return instance
    
class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        return super(LoginSerializer, cls).get_token(user)

class MyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'avatar', 'description', 'phone_number', 'password']

    def to_representation(self, instance):
        return super().to_representation(instance)

class MyRecipesSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['favourites', 'rated', 'likes', 'commented']

    def get_myrecipes(self, instance):
        myrecipes = {}
        for recipe in instance.myrecipes.all():
            curr_recipe = {}
            curr_recipe['id'] = recipe.id
            curr_recipe['name'] = recipe.name
            curr_recipe['description'] = recipe.description
            curr_recipe['rating'] = recipe.star_rating
            myrecipes[f"{recipe.id}"] = curr_recipe
        return myrecipes


        

    def to_representation(self, instance):

        orig_rep = super().to_representation(instance)
        favourites = {}
        #if orig_rep.get('favourites', None):
        for fav_id in orig_rep.get('favourites', None):
            cur_fav = {}
            cur_recipe = Recipe.objects.get(id=fav_id)
            cur_fav['id'] = cur_recipe.id
            cur_fav['name'] = cur_recipe.name
            cur_fav['description'] = cur_recipe.description
            cur_fav['rating'] = cur_recipe.star_rating
            favourites[f"{cur_recipe.id}"] = cur_fav

        interacted = {}
        for rated_id in orig_rep.get('rated', None):
            cur_rated = {}
            cur_recipe = Recipe.objects.get(id=rated_id)
            cur_rated['id'] = cur_recipe.id
            cur_rated['name'] = cur_recipe.name
            cur_rated['description'] = cur_recipe.description
            cur_rated['rating'] = cur_recipe.star_rating
            interacted[f"{cur_recipe.id}"] = cur_rated

        for likes_id in orig_rep.get('likes', None):
            if not likes_id in interacted:
                cur_like = {}
                cur_recipe = Recipe.objects.get(id=likes_id)
                cur_like['id'] = cur_recipe.id
                cur_like['name'] = cur_recipe.name
                cur_like['description'] = cur_recipe.description
                cur_like['rating'] = cur_recipe.star_rating
                interacted[f"{cur_recipe.id}"] = cur_like

        for commented_id in orig_rep.get('commented', None):
            if not commented_id in interacted:
                cur_commented = {}
                cur_recipe = Recipe.objects.get(id=commented_id)
                cur_commented['id'] = cur_recipe.id
                cur_commented['name'] = cur_recipe.name
                cur_commented['description'] = cur_recipe.description
                cur_commented['rating'] = cur_recipe.star_rating
                interacted[f"{cur_recipe.id}"] = cur_commented

        rep = {
            'myrecipes': self.get_myrecipes(instance),
            'favourites': favourites,
            'interacted': interacted,
        }
        return rep
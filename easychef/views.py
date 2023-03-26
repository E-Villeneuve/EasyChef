from rest_framework import filters

from recipes.models import Recipe
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from recipes.serializers import RecipeSerializer
from django.shortcuts import render

def index(request): return render(request, 'index.html')
def home(request): return render(request, 'home.html')

class SearchView(ListAPIView):
    """
    Recipes should be:
        - Searchable by:
            - Name
            - Ingredients
            - Owner
        - Filterable by:
            - Cuisine
            - Diet
            - Cooking time
        - Ordered by:
            - Overall rating
            - Number of users that have favourited the recipe
    
    """
    queryset = Recipe.objects.all().order_by('id')
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    
    # Will do partial matches 
    # (matching search must appear somewhere in the name, ingredient, or owner)
    search_fields = ['owner__email', 'name', 'ingredients__name']
    ordering_fields = ['star_rating', 'favourited']

    def get_queryset(self):
        query_params = self.request.query_params
        diet_filter = query_params.getlist('diets', '')
        cuisine_filter = query_params.getlist('cuisine', '')
        cookingtimetag_filter = query_params.getlist('cookingtimetag', '')
        queryset = Recipe.objects.all().order_by('id')
        for diet in diet_filter: queryset = queryset.filter(diets__icontains=diet)

        # Note: A recipe cannot have more than one cuisine or cooking time tag.
        # So, selecting multiple cuisines or cookingtimetags will result in no
        # search results
        for cuisine in cuisine_filter: queryset = queryset.filter(cuisine=cuisine)
        for cookingtag in cookingtimetag_filter: queryset = queryset.filter(cookingtimetag=cookingtag)
        return queryset

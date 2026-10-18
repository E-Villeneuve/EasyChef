from recipes.models import RecipeIngredient, RecipeImage

from collections import defaultdict
from decimal import Decimal

DECIMAL_PLACES = 2

# Units whose name takes an "s" (or "es") when the amount isn't 1
PLURALS = {'cup': 'cups', 'piece': 'pieces', 'pinch': 'pinches'}

def ingredient_totals(recipe, servings, totals=None):
    """
    Add <recipe>'s ingredients, scaled by <servings>, into <totals>:
    {(name, unit): Decimal quantity}. Pass the same <totals> to combine recipes.
    """
    if totals is None:
        totals = defaultdict(Decimal)
    for ingredient in RecipeIngredient.objects.filter(recipe=recipe).order_by('id'):
        totals[(ingredient.name, ingredient.unit)] += ingredient.quantity * servings
    return totals

def format_amount(quantity, unit):
    """Decimal('1.50'), 'cup' -> '1.5 cups'"""
    quantity = round(Decimal(quantity), DECIMAL_PLACES).normalize()
    number = f"{quantity:f}"
    label = dict(RecipeIngredient.Units.choices).get(unit, unit)
    if quantity != 1:
        label = PLURALS.get(unit, label)
    return f"{number} {label}"

def format_ingredients(totals):
    """
    {(name, unit): quantity} -> {name: "amount"}; a name used with several
    units lists each, e.g. {"Flour": "1 kg + 200 g"}.
    """
    by_name = {}
    for (name, unit), quantity in totals.items():
        by_name.setdefault(name, []).append(format_amount(quantity, unit))
    return {name: " + ".join(amounts) for name, amounts in by_name.items()}

def collect_ingredients_x(recipe, servings):
    return format_ingredients(ingredient_totals(recipe, servings))

def collect_ingredients(recipe):
    return collect_ingredients_x(recipe, recipe.servings)

def get_pic_rep(recipe):
    recipe_imgs = list(RecipeImage.objects.filter(recipe=recipe))
    if (recipe_imgs != []): return recipe_imgs[0].media_url()
    else: return None

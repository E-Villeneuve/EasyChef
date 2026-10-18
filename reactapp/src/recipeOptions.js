// Choices shared by the recipe pages; codes must match recipes/models.py
export const API = "http://127.0.0.1:8000";

export const CUISINES = [
    { value: 'AM', label: 'American' },
    { value: 'AR', label: 'Arabic' },
    { value: 'CA', label: 'Caribbean' },
    { value: 'CH', label: 'Chinese' },
    { value: 'DU', label: 'Dutch' },
    { value: 'FR', label: 'French' },
    { value: 'GR', label: 'Greek' },
    { value: 'IN', label: 'Indian' },
    { value: 'IT', label: 'Italian' },
    { value: 'JA', label: 'Japanese' },
    { value: 'KO', label: 'Korean' },
    { value: 'ME', label: 'Mexican' },
    { value: 'SP', label: 'Spanish' },
    { value: 'TH', label: 'Thai' },
    { value: 'VI', label: 'Vietnamese' },
    { value: 'WE', label: 'Welsh' },
];

export const DIETS = [
    { value: 'VE', label: 'Vegan', hint: 'No animal products' },
    { value: 'HA', label: 'Halal', hint: 'Prepared according to halal requirements' },
];

export const cuisineLabel = (code) => (CUISINES.find((c) => c.value === code) || {}).label;

export const dietLabel = (code) => (DIETS.find((d) => d.value === code) || {}).label || code;

// Ingredient units; values match RecipeIngredient.Units
export const UNITS = [
    { value: 'g', label: 'g' },
    { value: 'kg', label: 'kg' },
    { value: 'ml', label: 'ml' },
    { value: 'l', label: 'l' },
    { value: 'tsp', label: 'tsp' },
    { value: 'tbsp', label: 'tbsp' },
    { value: 'cup', label: 'cup' },
    { value: 'floz', label: 'fl oz' },
    { value: 'oz', label: 'oz' },
    { value: 'lb', label: 'lb' },
    { value: 'piece', label: 'piece' },
    { value: 'pinch', label: 'pinch' },
];

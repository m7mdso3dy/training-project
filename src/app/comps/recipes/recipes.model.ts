export interface Recipe {
  name: string;
  description: string;
  imageURL: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  amount: number;
}

export interface RecipeResponse {
  recipes: Recipe[]; // Adjust the type of 'recipes' based on the actual structure
}

export const Ingredients = [
  'Tomato',
  'Eggplant',
  'Zuchine',
  'Meat',
  'Eggs',
  'Potato',
];

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

export const Ingredients = [
  'Tomato',
  'Eggplant',
  'Zuchine',
  'Meat',
  'Eggs',
  'Potato',
];

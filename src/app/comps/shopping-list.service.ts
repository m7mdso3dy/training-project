import { Injectable } from '@angular/core';
import { Ingredient } from './recipes/recipes.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingList: Ingredient[] = [
    {
      name: 'Tomato',
      amount: 5,
    },
  ];

  constructor() {}

  getShoppingList() {
    return this.shoppingList;
  }

  addNewIngredient(ing: Ingredient): void {
    this.shoppingList.push(ing);
  }
  updateIngredient(ing: Ingredient, i: number): void {
    this.shoppingList[i] = ing;
  }
  deleteIngredient(i: number): void {
    this.shoppingList.splice(i, 1);
  }
}

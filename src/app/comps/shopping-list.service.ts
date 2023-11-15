import { Injectable } from '@angular/core';
import { Ingredient } from './recipes/recipes.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingList: Ingredient[] = [];

  constructor(private http: HttpClient) {}

  getShoppingList(): Observable<Ingredient[]> {
    return this.http
      .get<Ingredient[]>('http://localhost:3000/get-user-shopping-list')
      .pipe(
        map((res) => {
          this.shoppingList = res;
          return res;
        })
      );
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

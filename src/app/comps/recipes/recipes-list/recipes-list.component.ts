import { Component, OnInit } from '@angular/core';
import { RecipesDataService } from 'src/app/comps/recipes/recipes-data.service';
import { Ingredient, Recipe } from '../recipes.model';
import { Router } from '@angular/router';
import { ShoppingListService } from '../../shopping-list.service';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(
    private dataSeervice: RecipesDataService,
    private shoppingListSeervice: ShoppingListService,
    private router: Router
  ) {}
  showRecipeDetails(id: number) {
    this.router.navigate(['/recipes', Number(id) + 1]);
  }
  addToShoppingList(e: Event, i: number) {
    e.stopPropagation();

    let ingredients: Ingredient[] = [];
    ingredients = this.dataSeervice.getList()[i].ingredients;
    ingredients.forEach((ing) => {
      this.shoppingListSeervice.addNewIngredient(ing);
    });
  }
  ngOnInit(): void {
    console.log(this.dataSeervice.getList());

    this.recipes = this.dataSeervice.getList();
  }
}

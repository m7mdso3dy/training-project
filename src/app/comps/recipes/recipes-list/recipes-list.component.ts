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
    const roles = localStorage.getItem('roles');
    const rolesArr: string[] = roles ? JSON.parse(roles) : [];
    if (rolesArr.includes('admin')) {
      this.router.navigate(['/recipes', Number(id) + 1]);
    } else {
      return;
    }
  }
  addToShoppingList(e: Event, i: number) {
    e.stopPropagation();

    let ingredients: Ingredient[] = [];
    ingredients = this.recipes[i].ingredients;
    ingredients.forEach((ing) => {
      this.shoppingListSeervice.addNewIngredient(ing);
    });
  }
  ngOnInit(): void {
    this.dataSeervice.dataList$.subscribe((data) => {
      this.recipes = data;
    });
  }
}

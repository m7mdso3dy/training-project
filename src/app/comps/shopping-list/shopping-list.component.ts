import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient, Ingredients } from '../recipes/recipes.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients = Ingredients;
  ///
  shoppingList: Ingredient[] = [];
  isEditing: Boolean = false;
  activeEditingIndex = NaN;
  activeIngerdient: Ingredient = {
    name: '',
    amount: NaN,
  };
  constructor(private shoppingListService: ShoppingListService) {}
  resetIngForm(): void {
    this.isEditing = false;
    this.activeEditingIndex = NaN;
    this.activeIngerdient.name = '';
    this.activeIngerdient.amount = NaN;
  }
  editIngredient(i: number) {
    this.isEditing = true;
    this.activeEditingIndex = i;
    this.activeIngerdient.name = this.shoppingList[i].name;
    this.activeIngerdient.amount = this.shoppingList[i].amount;
  }
  deleteIngredient(i: number) {
    this.shoppingListService.deleteIngredient(i);
    console.log(i);
  }
  addNewIngerdientToShoppingList() {
    this.shoppingListService.addNewIngredient({
      name: this.activeIngerdient.name,
      amount: this.activeIngerdient.amount,
    });
    this.resetIngForm();
  }
  updateIngerdient() {
    this.shoppingListService.updateIngredient(
      {
        name: this.activeIngerdient.name,
        amount: this.activeIngerdient.amount,
      },
      this.activeEditingIndex
    );
    this.resetIngForm();
  }
  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.getShoppingList();
  }
}

import { Component, OnInit } from '@angular/core';
import { RecipesDataService } from '../recipes-data.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe, Ingredient } from '../recipes.model';
@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss'],
})
export class RecipesEditComponent implements OnInit {
  isEditing: Boolean = false;
  activeRecipeIndex: number | undefined = undefined;
  activeRecipe: Recipe = {
    name: '',
    description: '',
    imageURL: '',
    ingredients: [],
  };
  activeIngredient: Ingredient = {
    name: '',
    amount: NaN,
  };
  constructor(
    private recipeService: RecipesDataService,
    private route: ActivatedRoute
  ) {}
  addNewIngerdient() {
    this.activeRecipe.ingredients.push({
      name: this.activeIngredient.name,
      amount: this.activeIngredient.amount,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.isEditing = true;
        this.activeRecipeIndex = Number(param['id']) - 1;
        const fetchedRecipe = this.recipeService
          .getList()
          .find((item, i) => i == this.activeRecipeIndex);

        this.activeRecipe = {
          name: fetchedRecipe?.name || '',
          description: fetchedRecipe?.description || '',
          imageURL: fetchedRecipe?.imageURL || '',
          ingredients: fetchedRecipe?.ingredients || [],
        };
      }
    });
  }
}

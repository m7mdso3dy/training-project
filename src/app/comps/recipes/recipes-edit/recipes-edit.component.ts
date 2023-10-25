import { Component, OnInit } from '@angular/core';
import { RecipesDataService } from '../recipes-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, Ingredient, Ingredients } from '../recipes.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss'],
})
export class RecipesEditComponent implements OnInit {
  ingredients = Ingredients;
  //
  isEditing: Boolean = false;
  activeRecipeIndex: number = NaN;
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
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
  addNewIngerdient() {
    this.activeRecipe.ingredients.push({
      name: this.activeIngredient.name,
      amount: this.activeIngredient.amount,
    });
  }
  navigateToRecipesPage() {
    this.router.navigate(['/recipes']);
  }
  deleteRecipe() {
    /* use recipes service to delete the current recipe */
    if (this.activeRecipeIndex) {
      this.recipeService.deleteExistingRecipe(this.activeRecipeIndex);
      this.navigateToRecipesPage();
    }
  }
  add_update_recipe() {
    /**
     * use recipes service to add or update the recipes based on the edit mode
     */
    console.log(this.isEditing, this.activeRecipeIndex);

    if (this.isEditing && this.activeRecipeIndex >= 0) {
      this.recipeService.updateExistingRecipe(
        this.activeRecipe,
        this.activeRecipeIndex
      );
    } else {
      this.recipeService.addNewRecipe(this.activeRecipe);
    }
    this.navigateToRecipesPage();
  }
  removeIngerdient(i: number) {
    this.activeRecipe.ingredients.splice(i, 1);
  }
  onFileSelected(e: any) {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    this.http
      .post('http://localhost:3000/upload-file', formData)
      .subscribe((data: any) => {
        this.activeRecipe.imageURL = `http://localhost:3000/uploads/${data.filePath}`;
      });
  }
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.isEditing = true;
        this.activeRecipeIndex = Number(param['id']) - 1;
        let fetchedRecipe: Recipe | undefined;
        this.recipeService.dataList$.subscribe((data) => {
          if (data.length > 0) {
            fetchedRecipe = data.find((item, i) => i == this.activeRecipeIndex);
          }
          this.activeRecipe = {
            name: fetchedRecipe?.name || '',
            description: fetchedRecipe?.description || '',
            imageURL: fetchedRecipe?.imageURL || '',
            ingredients: fetchedRecipe?.ingredients || [],
          };
        });
      }
    });
  }
}

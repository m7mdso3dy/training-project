import { Injectable } from '@angular/core';

import { Recipe } from './recipes.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesDataService {
  private dataList: Recipe[] = [
    {
      name: 'recipe1',
      description: 'desc 1',
      imageURL:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      ingredients: [],
    },
    {
      name: 'recipe2',
      description: 'desc 1',
      imageURL:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      ingredients: [],
    },
    {
      name: 'recipe3',
      description: 'desc 1',
      imageURL:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      ingredients: [
        {
          name: 'ing 1',
          amount: 5,
        },
        {
          name: 'ing 2',
          amount: 10,
        },
      ],
    },
  ];

  getList() {
    return this.dataList;
  }
  addNewRecipe(newRecipe: Recipe) {
    this.dataList.push(newRecipe);
  }
  updateExistingRecipe(updatedRecipe: Recipe, i: number) {
    console.log(i);
    this.dataList[i] = updatedRecipe;
  }
  deleteExistingRecipe(i: number) {
    this.dataList.splice(i, 1);
  }
}

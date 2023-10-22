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
  ];

  getList() {
    return this.dataList;
  }
}

import { Injectable } from '@angular/core';
import { Recipe, RecipeResponse } from './recipes.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesDataService {
  private dataListSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject<
    Recipe[]
  >([]);
  dataList$: Observable<Recipe[]> = this.dataListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadDataFromJson();
  }

  private loadDataFromJson() {
    this.http.get('./../../../assets/data.json').subscribe((res) => {
      const recipes = (res as RecipeResponse).recipes;
      this.dataListSubject.next(recipes);
    });
  }
  private updateDateFile(currentDataList: Recipe[]) {
    this.http
      .post('http://localhost:3000/update-data', currentDataList)
      .subscribe((data) => {
        console.log(data);
      });
  }

  addNewRecipe(newRecipe: Recipe) {
    const currentDataList = this.dataListSubject.value;
    currentDataList.push(newRecipe);
    this.dataListSubject.next(currentDataList);
    this.updateDateFile(currentDataList);
  }

  updateExistingRecipe(updatedRecipe: Recipe, index: number) {
    const currentDataList = this.dataListSubject.value;
    currentDataList[index] = updatedRecipe;
    this.dataListSubject.next(currentDataList);
    this.updateDateFile(currentDataList);
  }

  deleteExistingRecipe(index: number) {
    const currentDataList = this.dataListSubject.value;
    currentDataList.splice(index, 1);
    this.dataListSubject.next(currentDataList);
    this.updateDateFile(currentDataList);
  }
}

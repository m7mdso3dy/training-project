import { Component, OnInit } from '@angular/core';
import { RecipesDataService } from 'src/app/comps/recipes/recipes-data.service';
import { Recipe } from '../recipes.model';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(private dataSeervice: RecipesDataService) {}
  ngOnInit(): void {
    this.recipes = this.dataSeervice.getList();
  }
}

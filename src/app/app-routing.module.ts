import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './comps/recipes/recipes.component';
import { RecipesListComponent } from './comps/recipes/recipes-list/recipes-list.component';
import { RecipesEditComponent } from './comps/recipes/recipes-edit/recipes-edit.component';

import { ShoppingListComponent } from './comps/shopping-list/shopping-list.component';
const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipesListComponent,
      },
      {
        path: 'new',
        component: RecipesEditComponent,
      },
      {
        path: ':id',
        component: RecipesEditComponent,
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
/**
 * recipes
shopping-list
 */

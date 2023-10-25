import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './comps/header/header.component';
import { RecipesListComponent } from './comps/recipes/recipes-list/recipes-list.component';
import { RecipesEditComponent } from './comps/recipes/recipes-edit/recipes-edit.component';
import { RecipesComponent } from './comps/recipes/recipes.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListComponent } from './comps/shopping-list/shopping-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesListComponent,
    RecipesEditComponent,
    RecipesComponent,
    ShoppingListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

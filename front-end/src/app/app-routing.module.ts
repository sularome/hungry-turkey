import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealComponent } from './meal/meal.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { UnitsComponent } from './units/units.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'ingredient/:id', component: IngredientComponent },
{ path: 'ingredients', component: IngredientListComponent },
{ path: 'recipe/:id', component: RecipeComponent },
{ path: 'recipe', component: RecipeListComponent },
{ path: 'meal/:id', component: MealComponent },
{ path: 'meal', component: MealListComponent },
{ path: 'units', component: UnitsComponent }
];

@NgModule({
  imports: [    
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe/Recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipes();
  }

  delete(recipe: Recipe): void {
    this.recipes = this.recipes.filter(i => i !== recipe);
    this.recipeService.deleteRecipe(recipe).subscribe();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipe => this.recipes = recipe);
  }
}

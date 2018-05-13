import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Recipe } from './Recipe';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../meal.service';
import { RecipeService } from '../recipe.service';
import { IngredientService } from '../ingredient.service';
import {Location} from '@angular/common';
import { Ingredient } from '../ingredient/Ingredient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipeForm: FormGroup;
  ingredientList: Observable<Ingredient[]>

  constructor(    
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.recipeForm = this.formBuilder.group({
      name: "",
      id: null,
      ingredients: this.formBuilder.array([])
    });
    this.ingredientList = this.ingredientService.getIngredients();
  }

  ngOnInit() {
    this.getRecipe();
  }

  addIngredient() {
    this.ingredients.push(new FormControl(null));
  }
 
  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id === -1) {
      return;
    }
    this.recipeService.getRecipe(id)
      .subscribe(meal => {
        this.recipeForm.patchValue({name: meal.name, id: meal.id});
        const recipesFC = meal.ingredients.map(r => new FormControl(r));
        this.recipeForm.setControl("ingredients", this.formBuilder.array(recipesFC));
      });
  }
 
  goBack(): void {
    this.location.back();
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  };
 
 save(): void {
    const recipe = this.recipeForm.value;
    if (recipe.id === null) {
      this.recipeService.addRecipe(recipe)
      .subscribe(() => this.goBack());
    } else {
      this.recipeService.updateRecipe(recipe)
        .subscribe(() => this.goBack());
    }
  }
}

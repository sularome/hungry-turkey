import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { MealService } from '../meal.service';
import { Meal } from './Meal';
import {Location} from '@angular/common';
import { RecipeService } from '../recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe/Recipe';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  mealForm: FormGroup;
  recipeList: Observable<Recipe[]>

  constructor(    
    private route: ActivatedRoute,
    private mealService: MealService,
    private recipeService: RecipeService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.mealForm = this.formBuilder.group({
      name: "",
      id: null,
      recipes: this.formBuilder.array([])
    });
    this.recipeList = this.recipeService.getRecipes();
  }

  ngOnInit() {
    this.getIngredient();
  }

  addRecipe() {
    this.recipes.push(new FormControl(null));
  }
 
  getIngredient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.mealService.getMeal(id)
      .subscribe(meal => {
        this.mealForm.patchValue({name: meal.name, id: meal.id});
        const recipesFC = meal.recipes.map(r => new FormControl(r));
        this.mealForm.setControl("recipes", this.formBuilder.array(recipesFC));
      });
  }
 
  goBack(): void {
    this.location.back();
  }

  get recipes(): FormArray {
    return this.mealForm.get('recipes') as FormArray;
  };
 
 save(): void {
    this.mealService.updateMeal(this.mealForm.value)
      .subscribe(() => this.goBack());
  }
}

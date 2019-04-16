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
import { UnitService } from '../unit.service';
import { Unit } from '../units/Unit';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipeForm: FormGroup;
  ingredientList: Observable<Ingredient[]>;
  unitsList: Observable<Unit[]>;

  constructor(    
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private unitsService: UnitService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.recipeForm = this.formBuilder.group({
      name: "",
      _id: "-1",
      ingredients: this.formBuilder.array([])
    });
    this.ingredientList = this.ingredientService.getIngredients();
    this.unitsList = this.unitsService.getUnits();
  }

  ngOnInit() {
    this.getRecipe();
  }

  addIngredient() {
    const ingredients: FormArray = this.recipeForm.controls.ingredients as FormArray;
    ingredients.push(new FormGroup({
      ingredient: new FormControl(``),
      amount: new FormControl(0),
      unit: new FormControl(``),
    }));
  }
 
  getRecipe(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id === "-1") {
      return;
    }
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.recipeForm.patchValue({name: recipe.name, _id: recipe._id});
        const recipesFC = recipe.ingredients.map(r => new FormGroup({
            ingredient: new FormControl(r.ingredient),
            amount: new FormControl(r.amount),
            unit: new FormControl(r.unit),
        }));
        this.recipeForm.setControl("ingredients", new FormArray(recipesFC));
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
    if (recipe._id === "-1") {
      this.recipeService.addRecipe(recipe)
      .subscribe(() => this.goBack());
    } else {
      this.recipeService.updateRecipe(recipe)
        .subscribe(() => this.goBack());
    }
  }
}

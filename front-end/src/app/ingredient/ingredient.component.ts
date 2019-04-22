import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../ingredient/Ingredient';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  ingredientForm: FormGroup;

  constructor(    
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.ingredientForm = this.formBuilder.group({
      name: new FormControl(""),
      _id: new FormControl("-1"),
      calories: new FormControl(null),
      Created_date: new FormControl(""),
      __v: new FormControl(""),
      protein: new FormControl(null),
      carbs: new FormControl(null),
      sugar: new FormControl(null),
      fiber: new FormControl(null),
      fat: new FormControl(null),
      saturated: new FormControl(null),
      monounsaturated: new FormControl(null),
      polyunsaturated: new FormControl(null),
      omega3: new FormControl(null),
      omega6: new FormControl(null),
      transFat: new FormControl(null),
      transformations: new FormArray([
        new FormGroup({
          unit: new FormControl(``),
          ratio: new FormControl(null)
        })
      ])
    });
  }

  ngOnInit() {
    this.getIngredient();
  }

  addTransformation() {
    const transformations = this.ingredientForm.controls.transformations as FormArray;
    transformations.push(new FormGroup({
      unit: new FormControl(''),
      ratio: new FormControl(1)
    }));
  }

  removeTransformation(index: number) {
    const transformations = this.ingredientForm.controls.transformations as FormArray;
    transformations.removeAt(index);
  }
 
  getIngredient(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === "-1") {
      return;
    }
    this.ingredientService.getIngredient(id)
      .subscribe(ingredient => {
        this.ingredientForm.get("name").setValue(ingredient.name);
        this.ingredientForm.get("_id").setValue(ingredient._id);
        this.ingredientForm.get("calories").setValue(ingredient.calories);
        this.ingredientForm.get("Created_date").setValue(ingredient.Created_date);
        this.ingredientForm.get("__v").setValue(ingredient.__v);
        this.ingredientForm.get("protein").setValue(ingredient.protein);
        this.ingredientForm.get("carbs").setValue(ingredient.carbs);
        this.ingredientForm.get("sugar").setValue(ingredient.sugar);
        this.ingredientForm.get("fiber").setValue(ingredient.fiber);
        this.ingredientForm.get("fat").setValue(ingredient.fat);
        this.ingredientForm.get("saturated").setValue(ingredient.saturated);
        this.ingredientForm.get("monounsaturated").setValue(ingredient.monounsaturated);
        this.ingredientForm.get("polyunsaturated").setValue(ingredient.polyunsaturated);
        this.ingredientForm.get("omega3").setValue(ingredient.omega3);
        this.ingredientForm.get("omega6").setValue(ingredient.omega6);
        this.ingredientForm.get("transFat").setValue(ingredient.transFat);
        const transformations = ingredient.transformations.map(t => new FormGroup({
          unit: new FormControl(t.unit),
          ratio: new FormControl(t.ratio)
        }));
        this.ingredientForm.setControl(`transformations`, new FormArray(transformations));
      });
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    const ingredient = this.ingredientForm.value;
    if (ingredient._id === "-1") {
      this.ingredientService.addIngredient(ingredient)
      .subscribe(() => this.goBack());
    } else {
      this.ingredientService.updateIngredient(ingredient)
        .subscribe(() => this.goBack());
    }
  }
}

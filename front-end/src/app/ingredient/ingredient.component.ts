import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../ingredient/Ingredient';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    this.ingredientForm = this.formBuilder.group(new Ingredient());
  }

  ngOnInit() {
    this.getIngredient();
  }
 
  getIngredient(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === "-1") {
      return;
    }
    this.ingredientService.getIngredient(id)
      .subscribe(ingredient => this.ingredientForm.setValue(ingredient));
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    const ingredient = this.ingredientForm.value;
    if (ingredient.id === null) {
      this.ingredientService.addIngredient(ingredient)
      .subscribe(() => this.goBack());
    } else {
      this.ingredientService.updateIngredient(ingredient)
        .subscribe(() => this.goBack());
    }
  }
}

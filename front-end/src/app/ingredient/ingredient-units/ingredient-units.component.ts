import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { IngredientService } from '../../ingredient.service';
import { Observable } from 'rxjs';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ingredient-units',
  template: `
    <mat-select  [formControl]="unitControl">
      <mat-option *ngFor="let unitOption of unitsList" [value]="unitOption">
        {{ unitOption }}
      </mat-option>
    </mat-select>
  `,
  styles: [],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IngredientUnitsComponent),
      multi: true
    }
  ]
})
export class IngredientUnitsComponent implements OnInit, ControlValueAccessor {
  _ingredientId: string;
  unitControl: FormControl = new FormControl(``);

  private tick: (value?: string[]) => void;
  private propagateChange = (_: any) => {};
  
  unitsList: string[]= [];

  constructor(
    private ingredientService: IngredientService
    ) { }

  ngOnInit() {
    this.unitControl.valueChanges.subscribe(() => {
      this.propagateChange(this.unitControl.value);
    });
  }

  @Input()
  set ingredientId(ingredientId: string) {
    if (ingredientId === "-1") {
      this.unitsList = [];
    } else {
      this.ingredientService.getIngredient(ingredientId).subscribe(ingredient => {
        this.unitsList = ingredient.transformations.map(t => t.unit);
      });
    }
  } 
  
  writeValue(value: any) {
    this.unitControl.setValue(value);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}

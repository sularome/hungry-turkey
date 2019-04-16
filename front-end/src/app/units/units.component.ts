import { Component, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { Unit } from './Unit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  public unitsList: Unit[] = [];
  public displayEmptyUnit: boolean = false;
  public newUnitName: string = ``;

  constructor(
    private unitService: UnitService
  ) {   }

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients(): void {
    this.unitService.getUnits()
      .subscribe(units => this.unitsList = units);
  }

  toggleEmptyUnit(): void {
    this.displayEmptyUnit = !this.displayEmptyUnit;
  }
  
  addNewUnit(): void {
    this.displayEmptyUnit = false;
    this.unitService.addUnit({
      _id: "-1",
      name: this.newUnitName
    }).subscribe((unit) => {
        this.unitsList.push(unit);
    });
    this.newUnitName = "";
  }
  
  isValidNewUnit(): boolean {
    return this.newUnitName.length > 0
  }

  delete(unit: Unit): void {
    this.unitService.deleteUnit(unit)
    .subscribe((deletedUnit) => {
      const index = this.unitsList.findIndex(u => u._id === unit._id);
      this.unitsList.splice(index, 1)
    });
  }
}

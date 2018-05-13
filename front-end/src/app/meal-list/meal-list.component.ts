import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal/Meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {

  meals: Meal[] = [];

  constructor(private mealService: MealService) { }

  ngOnInit() {
    this.getMeals();
  }

  delete(meal: Meal): void {
    this.meals = this.meals.filter(i => i !== meal);
    this.mealService.deleteMeal(meal).subscribe();
  }

  getMeals(): void {
    this.mealService.getMeals()
      .subscribe(meals => this.meals = meals);
  }
}

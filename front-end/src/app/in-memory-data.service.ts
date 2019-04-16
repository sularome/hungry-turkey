import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Recipe } from './recipe/Recipe';
import { Meal } from './meal/Meal';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // const ingredients: Ingredient[] = [
    //   {
    //     "name": "Tomatoe",
    //     "id": 12,
    //     "calories": 18,
    //     "protein": 0.9,
    //     "carbs": 3.9,
    //     "sugar": 2.6,
    //     "fiber": 1.2,
    //     "fat": 0.2,
    //     "saturated": 0.02,
    //     "monounsaturated": 0.03,
    //     "polyunsaturated": 0.08,
    //     "omega3": 0,
    //     "omega6": 0.08,
    //     "transFat": 0
    // },
    //   { id: 13, name: 'Twarożek wiejski',
    //   "calories": 18,
    //   "protein": 0.9,
    //   "carbs": 3.9,
    //   "sugar": 2.6,
    //   "fiber": 1.2,
    //   "fat": 0.2,
    //   "saturated": 0.02,
    //   "monounsaturated": 0.03,
    //   "polyunsaturated": 0.08,
    //   "omega3": 0,
    //   "omega6": 0.08,
    //   "transFat": 0 },
    //   { id: 14, name: 'Twaróg półtłusty',
    //   "calories": 18,
    //   "protein": 0.9,
    //   "carbs": 3.9,
    //   "sugar": 2.6,
    //   "fiber": 1.2,
    //   "fat": 0.2,
    //   "saturated": 0.02,
    //   "monounsaturated": 0.03,
    //   "polyunsaturated": 0.08,
    //   "omega3": 0,
    //   "omega6": 0.08,
    //   "transFat": 0 }
    // ];

    // const recipes: Recipe[] = [
    //   {id: 0, name: 'Twaróg półtłusty', ingredients: [{id: 14, amount: 250}]},
    //   {id: 1, name: 'Twarożek wiejski', ingredients: [{id: 13, amount: 130}]}
    // ];

    const meals: Meal[] = [
      {id: 0, recipes: [0, 1], name: "Dzien twarozkowy"}
    ];

    return { meals};
  }
}
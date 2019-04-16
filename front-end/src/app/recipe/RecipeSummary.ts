import { IngredientAmount } from "./IngredientAmount";

export class RecipeSummary {
    name: string = "";
    _id: number = 0;
    ingredients: IngredientAmount[] = [];
    protein: number = null;
    calories: number = null;
    fat: number = null;
}


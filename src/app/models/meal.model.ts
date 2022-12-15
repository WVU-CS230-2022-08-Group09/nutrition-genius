import { BaseObject } from "./base.object";

export class MealModel extends BaseObject { //extends Observable<IngredientModel> {
    meal_time!:string;
    recipes!:string;
    calories!: number;
    carbs!: number;
    fat!: number;
    protein!: number;
    override listSource = "meals";

}
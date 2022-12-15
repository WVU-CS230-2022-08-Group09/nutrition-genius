//Model: Meal Model
//Contributor(s):
//Summary: 


import { BaseObject } from "./base.object";

export class MealModel extends BaseObject { //extends Observable<IngredientModel> {
    calories!: number;
    carbs!: number;
    fat!: number;
    protein!: number;
    override listSource = "meals";

}
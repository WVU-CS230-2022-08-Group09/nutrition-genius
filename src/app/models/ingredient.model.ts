//Component: Ingredient Model
//Contributor(s):
//Summary: 

import { BaseObject } from "./base.object";

export class IngredientModel extends BaseObject { 
    calories!: number;
    carbs!: number;
    fat!: number;
    protein!: number;
    override listSource = "ingredients";
}
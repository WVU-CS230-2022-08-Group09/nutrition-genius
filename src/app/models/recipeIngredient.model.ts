//Model: Recipe ingredients Model
//Contributor(s):
//Summary: 

import { BaseObject } from "./base.object";

export class RecipeIngredientModel extends BaseObject { 
    recipe!: string;
    amount!: number;
    override listSource = "recipeIngredients";
}
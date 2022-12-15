import { BaseObject } from "./base.object";

export class RecipeIngredientModel extends BaseObject { 
    ownKey!:string;
    recipeKey!:string;
    recipeIngredientKey!: string;
    amount!: number;
    override listSource = "recipeIngredients";
}


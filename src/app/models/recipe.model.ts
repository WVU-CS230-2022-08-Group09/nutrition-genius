import { BaseObject } from "./base.object";
import { getDatabase, ref, set } from "firebase/database";

export class RecipeModel extends BaseObject { //extends Observable<IngredientModel> {
    description!:string;
    ingredients!: string;
    ethnicity!:string;
    instructions!:string;
    meal_time!: string;
    override listSource = "recipes";

}
 


    
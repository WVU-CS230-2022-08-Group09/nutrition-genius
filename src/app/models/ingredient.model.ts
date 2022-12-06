import { Observable } from "rxjs";


export class IngredientModel { //extends Observable<IngredientModel> {
    name!: string;
    calories!: number;
    carbs!: number;
    fat!: number;
    protein!: number;

}
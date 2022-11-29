import { FactoryTarget } from "@angular/compiler";

export class IngredientModel{
    name: string;
    calories: number;
    carbs: number;
    fat: number;
    protein: number;

    constructor(name: string, calories: number, carbs: number, fat: number, protein: number){
        this.name = name;
        this.calories = calories;
        this.carbs = carbs;
        this.fat = fat;
        this.protein = protein;
    }
    


}
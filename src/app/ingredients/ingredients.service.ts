import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IngredientModel } from "../models/ingredient.model";


@Injectable(
    {providedIn: 'root'}
)
export class IngredientsService {

    private baseUrl:string = "https://nutrition-genius-default-rtdb.firebaseio.com/";
    private ingredientsEndPoint = "ingredients.json";

    constructor(private http:HttpClient){

    }




    getIngredients() {
        return this.http.get<IngredientModel []>(this.baseUrl + this.ingredientsEndPoint)
    }
    getIngredient(name:string){
        return this.http.get<IngredientModel>(this.baseUrl + 'ingredients' + '/' + name + '.json');
    }

    addIngredient(ingredient: IngredientModel) {
        
    }

} 
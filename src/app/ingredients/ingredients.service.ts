import { Injectable } from "@angular/core";
import { IngredientModel } from "../models/ingredient.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";


@Injectable(
    {providedIn: 'root'}
)
export class IngredientsService {

    private baseUrl:string = "https://nutrition-genius-default-rtdb.firebaseio.com/";
    private ingredientsEndPoint = "ingredients.json";

    // inject database into the component
    constructor(private db:AngularFireDatabase) {

    }

    getIngredients() {
        // return the list of ingredients from the database
        return this.db.list<IngredientModel>("ingredients").valueChanges();
    }

    // not used yet
    // getIngredient(name:string){
    //     return this.http.get<IngredientModel>(this.baseUrl + 'ingredients' + '/' + name + '.json');
    // }

    addIngredient(ingredient: IngredientModel) {
        // push new ingredient to the database
        this.db.list<IngredientModel>("ingredient").push(ingredient);
    }

} 
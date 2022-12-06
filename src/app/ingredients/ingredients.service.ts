import { Injectable } from "@angular/core";
import { IngredientModel } from "../models/ingredient.model";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";


@Injectable(
    {providedIn: 'root'}
)
export class IngredientsService {

    ingredientsRef: AngularFireList<IngredientModel>;

    // inject database into the component
    constructor(private db:AngularFireDatabase) {
        this.ingredientsRef = db.list('/ingredients');
    }

    getIngredients(): AngularFireList<IngredientModel> {
        // return the list of ingredients from the database
        //return this.db.list<IngredientModel>("ingredients").valueChanges();
        return this.ingredientsRef;
    }

    addIngredient(ingredient: IngredientModel): any {
        // push new ingredient to the database
        //this.db.list<IngredientModel>("ingredient").push(ingredient);
        return this.ingredientsRef.push(ingredient);
    }

    updateIngredient(key: string, ingredient: IngredientModel): Promise<void> {
        return this.ingredientsRef.update(key, ingredient);
    }

    deleteIngredient(key: string) : Promise<void> {
        return this.ingredientsRef.remove(key);
    }

} 
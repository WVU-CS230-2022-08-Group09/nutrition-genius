import { Injectable } from "@angular/core";
import { RecipeIngredientModel } from "../models/recipeIngredient.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BaseService } from "../services/base.service";

@Injectable(
    { providedIn: 'root' }
)
export class RecipeIngredientService extends BaseService<RecipeIngredientModel> {

    // inject database into the component
    constructor(db: AngularFireDatabase) {
        super(db, new RecipeIngredientModel());
    }

} 
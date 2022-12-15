import { Injectable } from "@angular/core";
import { IngredientModel } from "../models/ingredient.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BaseService } from "../services/base.service";
import { RecipeModel } from "../models/recipe.model";

@Injectable(
    { providedIn: 'root' }
)
export class RecipeService extends BaseService<RecipeModel> {

    // inject database into the component
    constructor(db: AngularFireDatabase) {
        super(db, new RecipeModel());
    }

} 
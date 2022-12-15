import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BaseService } from "../services/base.service";
import { RecipeModel } from "../models/recipe.model";

@Injectable(
    { providedIn: 'root' }
)
export class RecipeService extends BaseService<RecipeModel> {

    private db: AngularFireDatabase;
    private recipeKey: string = "";

    // inject database into the component
    constructor(db: AngularFireDatabase) {
        super(db, new RecipeModel());
        this.db = db;
    }

    public setRecipeKey(recipeKey: string) {
        this.recipeKey = recipeKey;
    }
} 
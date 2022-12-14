import { Injectable } from "@angular/core";
import { IngredientModel } from "../models/ingredient.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BaseService } from "../services/base.service";

@Injectable(
    { providedIn: 'root' }
)
export class IngredientsService extends BaseService<IngredientModel> {

    // inject database into the component
    constructor(db: AngularFireDatabase) {
        super(db, new IngredientModel());
    }

} 
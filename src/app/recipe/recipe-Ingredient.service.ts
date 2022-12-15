import { Injectable, Input } from "@angular/core";
import { RecipeIngredientModel } from "../models/recipeIngredient.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BaseService } from "../services/base.service";
import { map, Observable } from "rxjs";
import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids";
import { getDatabase, ref, get, query, onValue, child, equalTo } from "firebase/database";
import { IngredientModel } from "../models/ingredient.model";

@Injectable(
    { providedIn: 'root' }
)

export class RecipeIngredientService extends BaseService<RecipeIngredientModel> {

    private recipeKey: string = "";
    private db: AngularFireDatabase;
    private calories: number = 0;

    // inject database into the component
    constructor(db: AngularFireDatabase) {
        super(db, new RecipeIngredientModel());
        this.db = db;
    }

    public executeRecipe(state: any): void {
        // subscribe to the observable to get changes in data state in the grid
        // debugger;
        this.getRecipeData(state).subscribe(i => super.next(i as DataStateChangeEventArgs));
    }

    public setRecipeKey(recipeKey: string) {
        // debugger;
        this.recipeKey = recipeKey;
    }

    public getRecipeKey() : string {
        return this.recipeKey;
    }


    public getCalories(): number {
        return this.calories;
    }


    // get all of the rows to display in the grid
    getRecipeData(state?: any): Observable<any> {
        // debugger;
        return this.db.list(this.listSource, ref => ref.orderByChild("recipe").equalTo(this.recipeKey)).snapshotChanges()
            .pipe(map((changes: any) => ({
                count: changes.length,
                result: changes.map((c: any) => ({
                    ...(c.payload.val()),
                    key: c.payload.key
                }))
            }))

            )
    }

    public calcCalories() {
        var result: number = 0;
        
        var recipeIngrs = this.getRecipeIngredients();
        
        var ingrs = this.getIngredients();

        for(let i = 0; i < recipeIngrs.length; i++) {
            for(let j = 0; j < ingrs.length; j++) {
                if(recipeIngrs[i].recipe == this.recipeKey && recipeIngrs[i].ingredient == ingrs[j].key) {
                    result += recipeIngrs[i].amount * ingrs[j].calories;
                }
            }
        }
        this.calories = result;
    }

    public getIngredients(): IngredientModel[] {
        var result : IngredientModel[] = [];
        var dbase = getDatabase(this.db.database.app);
        const dbRef = ref(dbase);
        get(child(dbRef, "ingredients")).then((i) => {
                // console.log(i.val());
                i.forEach((j) => {
                    let ingr : IngredientModel = {
                        key: j.val().key,
                        calories: j.val().calories,
                        fat: 0,
                        carbs: 0,
                        protein: 0,
                        listSource: ""
                    };
                    result.push(ingr);
                    // debugger;
                });
          });
        //   debugger;
          return result;
    }

    public getRecipeIngredients(): RecipeIngredientModel[] {
        var result : RecipeIngredientModel[] = [];
        var dbase = getDatabase(this.db.database.app);
        const dbRef = ref(dbase);
        get(child(dbRef, "recipeIngredients")).then((i) => {
                // console.log(i.val());
                i.forEach((j) => {
                    let ingr : RecipeIngredientModel = {
                        key: j.val().key,
                        amount: j.val().amount,                        
                        ingredient: j.val().ingredient,
                        recipe: "",
                        listSource: ""
                    };
                    result.push(ingr);
                    // debugger;
                });
          });
        //   debugger;
          return result;
    }


} 
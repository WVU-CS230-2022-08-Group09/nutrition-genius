import { Injectable } from "@angular/core";
import { IngredientModel } from "../models/ingredient.model";
import { Observable, Subject, map } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';

@Injectable(
    {providedIn: 'root'}
)
export class IngredientsService extends Subject<DataStateChangeEventArgs> {

    ingredientsRef!: AngularFireList<any>;

    // inject database into the component
    constructor(private db: AngularFireDatabase) {
        super();
        this.ingredientsRef = db.list('/ingredients');
    }

    public execute(state: any): void {
        this.getIngredients(state).subscribe(i => super.next(i as DataStateChangeEventArgs));
    }

    // getIngredients(state ?: any): Observable<any[]> {
    //     // return the list of ingredients from the database
    //     var result = this.db.list<IngredientModel>('/ingredients').valueChanges();
    //     return result.pipe(map((response: any) => response));
    // }

    getIngredients(state ?: any): Observable<any[]> {
        // return the list of ingredients from the database
        var result = this.db.list<IngredientModel>('/ingredients').valueChanges();
        return result.pipe(map((response: any) => ({
            result: state.take > 0 ? response.slice(0, state.take) : response,
            count: response.length
          } as any))).pipe(map((response: any) => response));
    }

    addIngredient(ingredient: IngredientModel): any {
        // push new ingredient to the database
        return this.ingredientsRef.push(ingredient);
    }

    updateIngredient(key: string, ingredient: IngredientModel): Promise<void> {
        return this.ingredientsRef.update(key, ingredient);
    }

    deleteIngredient(key: string) : Promise<void> {
        return this.ingredientsRef.remove(key);
    }

} 
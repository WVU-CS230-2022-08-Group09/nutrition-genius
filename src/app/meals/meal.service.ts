import { Injectable } from "@angular/core";
import { MealModel } from "../models/meal.model";
import { Observable, Subject, map } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';

@Injectable(
    {providedIn: 'root'}
)
export class MealService extends Subject<DataStateChangeEventArgs> {

    mealRef!: AngularFireList<any>;

    // inject database into the component
    constructor(private db: AngularFireDatabase) {
        super();
        this.mealRef = db.list('/meals');
    }

    public execute(state: any): void {
        this.getMeals(state).subscribe(i => super.next(i as DataStateChangeEventArgs));
    }

    // getIngredients(state ?: any): Observable<any[]> {
    //     // return the list of ingredients from the database
    //     var result = this.db.list<IngredientModel>('/ingredients').valueChanges();
    //     return result.pipe(map((response: any) => response));
    // }

    getMeals(state ?: any): Observable<any[]> {
        // return the list of ingredients from the database
        var result = this.db.list<MealModel>('/meals').valueChanges();
        return result.pipe(map((response: any) => ({
            result: state.take > 0 ? response.slice(0, state.take) : response,
            count: response.length
          } as any))).pipe(map((response: any) => response));
    }

    addMeal(meal: MealModel): any {
        // push new ingredient to the database
        return this.mealRef.push(meal);
    }

    updateMeal(key: string, meal: MealModel): Promise<void> {
        return this.mealRef.update(key, meal);
    }

    deleteIngredient(key: string) : Promise<void> {
        return this.mealRef.remove(key);
    }

} 
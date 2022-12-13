import { Injectable } from "@angular/core";
import { IngredientModel } from "../models/ingredient.model";
import { Observable, Subject, map } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { stringToNumber } from "@syncfusion/ej2-angular-charts";

@Injectable(
    { providedIn: 'root' }
)
export class IngredientsService extends Subject<DataStateChangeEventArgs> {

    dataRef!: AngularFireList<any>;

    // inject database into the component
    constructor(private db: AngularFireDatabase) {
        super();
        this.dataRef = db.list('ingredients');
    }

    public execute(state: any): void {
        // subscribe to the observable to get changes in data state in the grid
        this.getData(state).subscribe(i => super.next(i as DataStateChangeEventArgs));
    }

    // get all of the rows to display in the grid
    getData(state?: any): Observable<any> {
        return this.db.list(`ingredients`).snapshotChanges()
            .pipe(map((changes: any) => ({
                count: changes.length,
                result: changes.map((c: any) => ({
                    ...(c.payload.val()),
                    key: c.payload.key
                }))
            }))

            )
    }

    addData(ingredient: IngredientModel): any {
        // push new ingredient to the database
        return this.dataRef.push(ingredient);
    }

    updateData(key: string, ingredient: IngredientModel): any {
        // update data based off of the key provided
        return this.dataRef.update(key, ingredient);
    }

    deleteData(key: string): any {
        // delete data if the key is there
        if (key != "") {
            return this.dataRef.remove(key);
        }
    }

} 
import { Injectable } from "@angular/core";
import { Observable, Subject, map } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { BaseObject } from "../models/base.object";

@Injectable(
    { providedIn: 'root' }
)
export abstract class BaseService<T extends BaseObject> extends Subject<DataStateChangeEventArgs> {

    dataRef!: AngularFireList<T>;
    listSource!: string;
    private objectType: BaseObject;
    // inject database into the component
    constructor(private _db: AngularFireDatabase, objectType: BaseObject) {
        super();
        this.objectType = objectType;
        this.listSource = objectType.listSource as string;
        this.dataRef = _db.list(this.listSource);
    }

    public execute(state: any): void {
        // subscribe to the observable to get changes in data state in the grid
        this.getData(state).subscribe(i => super.next(i as DataStateChangeEventArgs));
    }

    // get all of the rows to display in the grid
    getData(state?: any): Observable<any> {
        return this._db.list(this.listSource).snapshotChanges()
            .pipe(map((changes: any) => ({
                count: changes.length,
                result: changes.map((c: any) => ({
                    ...(c.payload.val()),
                    key: c.payload.key
                }))
            }))

            )
    }

    getList(listName: string): Observable<any> {
        return this._db.list(listName).snapshotChanges()
        .pipe(map((changes: any) => ({
            count: changes.length,
            result: changes.map((c: any) => ({
                ...(c.payload.val()),
                key: c.payload.key
            }))
        }))

        )

    }

    addData(newObject: any): any {
        // push new ingredient to the database
        return this.dataRef.push(newObject);
    }

    updateData(key: string, updateObject: any): any {
        // update data based off of the key provided
        return this.dataRef.update(key, updateObject);
    }

    deleteData(key: string): any {
        // delete data if the key is there
        if (key != "") {
            return this.dataRef.remove(key);
        }
    }

} 
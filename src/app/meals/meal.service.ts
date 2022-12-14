import { Injectable } from "@angular/core";
import { MealModel } from "../models/meal.model";
import { Observable, Subject, map } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { BaseService } from "../services/base.service";

@Injectable(
    {providedIn: 'root'}
)
export class MealService extends BaseService<MealModel>{

    constructor(db: AngularFireDatabase) {
        super(db, new MealModel());
    }

} 
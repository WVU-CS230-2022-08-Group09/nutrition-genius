import { Component, OnInit, ViewChild } from '@angular/core';
import { MealModel } from "../models/meal.model";
import { GridComponent, EditService, PageService, ToolbarService, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { MealService } from "./meal.service";
import { Observable, Subject, map } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  public meals: Observable<DataStateChangeEventArgs>;
  public state: DataStateChangeEventArgs;
  public editSettings: Object;
  public toolbar: string[];
  public pageSettings: PageSettingsModel;

  @ViewChild('grid')
  public grid!: GridComponent;

  constructor(private mealService: MealService) {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.meals = mealService;   // ingredientsService.execute({ take : 25});
    this.state = { skip: 0, take: 10 };
    this.pageSettings = { pageSize: 10};
  }

  ngOnInit(): void {

    this.mealService.execute(this.state);
  }

  // Method that handles state changes (paging, sorting, etc.)
  public dataStateChange(state: DataStateChangeEventArgs): void {
    
    this.mealService.execute(state);
  }

  // Method that handles data changes in the grid
  public dataSourceChanged(state: DataSourceChangedEventArgs): void {

    console.log(state);
    if (state.action === 'add') {

      this.mealService.addMeal(state.data as MealModel);

      // this.ingredientsService.addIngredient(state.data).subscribe(() => {
      //     state.endEdit();
      // });

    } else if (state.action === 'edit') {
      // this.crudService.updateRecord(state).subscribe(() => {
      //     state.endEdit();
      // }, (e) => {
      //     this.grid.closeEdit();
      // }
      // );
    } else if (state.requestType === 'delete') {
      // this.crudService.deleteRecord(state).subscribe(() => {
      //     state.endEdit();
      // });
    }
  }


}


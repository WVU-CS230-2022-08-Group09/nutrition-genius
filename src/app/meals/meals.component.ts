import { Component, OnInit, ViewChild } from '@angular/core';
import { MealService } from './meal.service';
import { GridComponent, EditService, ToolbarService, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { MealModel } from '../models/meal.model';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css'],
  providers: [ToolbarService, EditService]

})
export class MealsComponent implements OnInit {

  public meal: Observable<DataStateChangeEventArgs>;
  public state: DataStateChangeEventArgs;
  public editSettings: Object;
  public toolbar: string[];
  public pageSettings: PageSettingsModel;
  public refresh!: Boolean;
  public data!: object[];
  @ViewChild('alertDialog')
  public alertDialog!: DialogComponent;
  public alertDlgBtnClick = () => {
    this.alertDialog.hide();
  }

  @ViewChild('grid')
  public grid!: GridComponent;

  constructor(private mealService: MealService) {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.meal = mealService;
    this.state = { skip: 0, take: 10 };
    this.pageSettings = { pageSize: 10 };
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
    if (state.action === 'add') {
      // Add new record to the database
      this.mealService.addData(state.data as MealModel).subscribe(() => {
        state.endEdit?.();
      });

    } else if (state.action === 'edit') {
      // edit existing record using the key to identify the row to edit
      this.mealService.updateData((state.data as MealModel).key as string, state.data as MealModel).subscribe(() => {
        state.endEdit?.();
      }, () => {
        this.grid.closeEdit();
      });
    } else if (state.requestType === 'delete') {
      // delete record based off of the key
      var key = (state.data as MealModel[])[0].key as string;
      this.mealService.deleteData(key).subscribe(() => {
        state.endEdit?.();
      });
    }
  }
  public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];

  dataBound() {
    if (this.refresh) {
      this.grid.groupColumn('Country');
      this.refresh = false;
    }
  }
  load() {
    this.refresh = (<any>this.grid).refreshing;
  }
  created() {
    this.grid.on("columnDragStart", this.columnDragStart, this);
  }
  public columnDragStart(args: any) {
    if (args.column.field === "Mainfieldsofinvention") {
      this.alertDialog.show();
    }
  }
}


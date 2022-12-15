import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSourceChangedEventArgs, DataStateChangeEventArgs, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs/internal/Observable';
import { MealModel } from 'src/app/models/meal.model';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
// export class MealDetailComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

export class MealDetailComponent implements OnInit {

  public ingredients: Observable<DataStateChangeEventArgs>;
  public state: DataStateChangeEventArgs;
  public editSettings: Object;
  public toolbar: string[];
  public pageSettings: PageSettingsModel;

  @ViewChild('grid')
  public grid!: GridComponent;

  constructor(private mealService: MealService) {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.ingredients = mealService;
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
      } , () => {
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
}


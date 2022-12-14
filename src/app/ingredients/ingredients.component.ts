import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, EditService, ToolbarService, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { IngredientsService } from './ingredients.service';
import { IngredientModel } from '../models/ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
  providers: [ToolbarService, EditService] 
})
export class IngredientsComponent implements OnInit {

  public ingredients: Observable<DataStateChangeEventArgs>;
  public state: DataStateChangeEventArgs;
  public editSettings: Object;
  public toolbar: string[];
  public pageSettings: PageSettingsModel;

  @ViewChild('grid')
  public grid!: GridComponent;

  constructor(private ingredientsService: IngredientsService) {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.ingredients = ingredientsService;
    this.state = { skip: 0, take: 10 };
    this.pageSettings = { pageSize: 10 };
  }

  ngOnInit(): void {

    this.ingredientsService.execute(this.state);
  }

  // Method that handles state changes (paging, sorting, etc.)
  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.ingredientsService.execute(state);
  }

  // Method that handles data changes in the grid
  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state.action === 'add') {
      // Add new record to the database
      this.ingredientsService.addData(state.data as IngredientModel).subscribe(() => {
          state.endEdit?.();
      });

    } else if (state.action === 'edit') {
      // edit existing record using the key to identify the row to edit
        this.ingredientsService.updateData((state.data as IngredientModel).key as string, state.data as IngredientModel).subscribe(() => {
          state.endEdit?.();
      } , () => {
          this.grid.closeEdit();
      });
    } else if (state.requestType === 'delete') {
      // delete record based off of the key
      var key = (state.data as IngredientModel[])[0].key as string;
      this.ingredientsService.deleteData(key).subscribe(() => {
          state.endEdit?.();
      });
    }
  }
}

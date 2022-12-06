import { Component, OnInit, ViewChild } from '@angular/core';
// import { IngredientModel } from '../models/ingredient.model';
import { IngredientsService } from './ingredients.service';
import { GridComponent, EditService, PageService, ToolbarService, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { map, Observable } from 'rxjs';
import { IngredientModel } from '../models/ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
  providers: [ToolbarService, EditService, PageService]
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
    this.ingredients = ingredientsService;   // ingredientsService.execute({ take : 25});
    this.state = { skip: 0, take: 10 };
    this.pageSettings = { pageSize: 10};
  }

  ngOnInit(): void {

    this.ingredientsService.execute(this.state);

    // this works to add ingredients through the service
    // var testObject : IngredientModel = {
    //   name : "test_2",
    //   calories : 222,
    //   carbs : 2,
    //   fat: 22,
    //   protein : 222
    // };
    // this.ingredientsService.addIngredient(testObject);
  }

  // Method that handles state changes (paging, sorting, etc.)
  public dataStateChange(state: DataStateChangeEventArgs): void {
    
    this.ingredientsService.execute(state);
  }

  // Method that handles data changes in the grid
  public dataSourceChanged(state: DataSourceChangedEventArgs): void {

    console.log(state);
    if (state.action === 'add') {

      this.ingredientsService.addIngredient(state.data as IngredientModel);

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

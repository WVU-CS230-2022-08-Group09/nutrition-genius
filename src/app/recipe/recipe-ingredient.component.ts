//Component: Ingredients
//Contributor(s):  
//Summary: 

import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, EditService, ToolbarService, PageSettingsModel, IEditCell, Column } from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable, Subject, map, pipe } from 'rxjs';
import { ForeignKeyService } from '@syncfusion/ej2-angular-grids';
import { RecipeIngredientService } from './recipe-Ingredient.service';
import { RecipeIngredientModel } from '../models/recipeIngredient.model';
import { IngredientModel } from '../models/ingredient.model';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { LegendItemStyle } from '@syncfusion/ej2-angular-charts';
import { IngredientsService } from '../ingredients/ingredients.service';
import { BaseObject } from '../models/base.object';

// import { IngredientsService } from '../ingredients/ingredients.service';

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.css'],
  providers: [ToolbarService, EditService, ForeignKeyService] 
})
export class RecipeIngredientComponent implements OnInit {

  public recipeIngredients: Observable<DataStateChangeEventArgs>;
  public state: DataStateChangeEventArgs;
  public editSettings: Object;
  public toolbar: string[];
  public pageSettings: PageSettingsModel;
  public ingredientData!:BaseObject[];
  

  @ViewChild('grid')
  public grid!: GridComponent;
  autoComplete: any;

  constructor(private recipeIngredientService: RecipeIngredientService) { //, private ingredientService: IngredientsService
    // this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    // this.toolbar = ['Add', 'Edit', 'Delete'];
    // this.recipeIngredients = recipeIngredientService;
    // this.state = { skip: 0, take: 10 };
    // this.pageSettings = { pageSize: 10 };

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.recipeIngredients = recipeIngredientService;
    // this.ingredientData = ingredientService;
    this.state = { skip: 0, take: 10 };
    this.pageSettings = { pageSize: 10 };
  }

  ngOnInit(): void {
    this.recipeIngredientService.execute({take: 100});
    this.ingredientData = this.recipeIngredientService.returnList("ingredients");
    // this.ingredientService.execute(this.state);
    //this.ingredientData = this.recipeIngredientService.execute("ingredients");
    // this.recipeIngredientService.getList("ingredients").subscribe((p: any) => 
    //   console.log(p.result));
      // p.result. );

    // console.log(this.ingredientData);
  }

  // Method that handles state changes (paging, sorting, etc.)
  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.recipeIngredientService.execute(state);
  }

  // Method that handles data changes in the grid
  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state.action === 'add') {
      // Add new record to the database
      this.recipeIngredientService.addData(state.data as RecipeIngredientModel).subscribe(() => {
          state.endEdit?.();
      });

    } else if (state.action === 'edit') {
      // edit existing record using the key to identify the row to edit
        this.recipeIngredientService.updateData((state.data as RecipeIngredientModel).key as string, state.data as RecipeIngredientModel).subscribe(() => {
          state.endEdit?.();
      } , () => {
          this.grid.closeEdit();
      });
    } else if (state.requestType === 'delete') {
      // delete record based off of the key
      var key = (state.data as RecipeIngredientModel[])[0].key as string;
      this.recipeIngredientService.deleteData(key).subscribe(() => {
          state.endEdit?.();
      });
    }
  }
}


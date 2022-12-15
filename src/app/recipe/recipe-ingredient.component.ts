//Component: Ingredients
//Contributor(s):  
//Summary: 

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GridComponent, EditService, ToolbarService, PageSettingsModel, IEditCell, Column } from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable, Subject, map, pipe } from 'rxjs';
import { ForeignKeyService } from '@syncfusion/ej2-angular-grids';
import { RecipeIngredientService } from './recipe-Ingredient.service';
import { RecipeIngredientModel } from '../models/recipeIngredient.model';
import { IngredientModel } from '../models/ingredient.model';
import { RecipeModel } from '../models/recipe.model';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { LegendItemStyle } from '@syncfusion/ej2-angular-charts';
import { IngredientsService } from '../ingredients/ingredients.service';
import { BaseObject } from '../models/base.object';
import { DropDown } from '../models/dropDown.model'

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
  public ingredientData!:DropDown[];
  public groupOptions: Object;
  
  @Input() recipeKey?: string;

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
    this.groupOptions = { showGroupedColumn: false };
  }

  ngOnInit(): void {
    
    this.ingredientData = this.recipeIngredientService.returnList("ingredients");
    
    this.recipeIngredientService.executeRecipe(this.state);
    //this.ingredientData = this.recipeIngredientService.execute("ingredients");
    // this.recipeIngredientService.getList("ingredients").subscribe((p: any) => 
    //   console.log(p.result));
      // p.result. );

    // console.log(this.ingredientData);
  }

//   public setRecipeKey(recipeKey: string) {
//     debugger;
//     this.recipeKey = recipeKey;
// }

  // Method that handles state changes (paging, sorting, etc.)
  public dataStateChange(state: DataStateChangeEventArgs): void {
    console.log(this.recipeKey);
    // this.recipeIngredientService.setRecipeKey(this.recipeKey as string);
    this.recipeIngredientService.executeRecipe(state);
  }

  // Method that handles data changes in the grid
  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state.action === 'add') {
      // Add new record to the database
      (state.data as RecipeIngredientModel).recipe = this.recipeIngredientService.getRecipeKey();
      this.recipeIngredientService.addData(state.data as RecipeIngredientModel).subscribe(() => {
          state.endEdit?.();
      });

    } else if (state.action === 'edit') {
      // edit existing record using the key to identify the row to edit
      (state.data as RecipeIngredientModel).recipe = this.recipeIngredientService.getRecipeKey();
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
debugger;
    this.recipeIngredientService.calcCalories();
  }
}


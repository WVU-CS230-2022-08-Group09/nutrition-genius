//Component: Recipe
//Contributor(s): Collin, Steve
//Summary: This is a grid that contains an edit form where the ingredients can be added to the recipe

import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, EditService, ToolbarService, PageSettingsModel, IEditCell, Column, SaveEventArgs, DialogEditEventArgs } from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { RecipeService } from './recipe.service';
import { RecipeIngredientService } from './recipe-Ingredient.service';
import { RecipeIngredientModel } from '../models/recipeIngredient.model';
import { RecipeModel } from '../models/recipe.model';

// component declarations
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [ToolbarService, EditService]
})

// class properties
export class RecipeComponent implements OnInit {
  public recipes: Observable<DataStateChangeEventArgs>;
  public state!: DataStateChangeEventArgs;
  public editSettings: Object;
  public toolbar: string[];
  public pageSettings: PageSettingsModel;
  public ingredientData?: RecipeModel[];
  public submitClicked: boolean = false;
  public groupOptions: Object;

  @ViewChild('grid')
  public grid?: GridComponent;
  orderForm: any;
  data!: Object[];

// constructor where services are injected
  constructor(private recipeService: RecipeService, private recipeIngredientService: RecipeIngredientService) {

      // set the values for the grid operators and the datasource
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.recipes = recipeService;
    this.state = { skip: 0, take: 10 };
    this.pageSettings = { pageSize: 10 };
    this.groupOptions = { showGroupedColumn: false };
  }

  ngOnInit(): void {
    // initialize the grid datasource
    this.recipeService.execute(this.state);
  }


// this method will build out the form for the edit
  createFormGroup(data: RecipeModel, ingredients?: RecipeIngredientModel[]): FormGroup {
    return new FormGroup({
      name: new FormControl(data.name, Validators.required),
      description: new FormControl(data.description, Validators.required),
      ethnicity: new FormControl(data.ethnicity),
      ingredients: new FormControl(data.ingredients),
      instructions: new FormControl(data.instructions),
      meal_time: new FormControl(data.meal_time)
    });
  }

  // action begin is where different actions are caught for different operations
  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.submitClicked = false;
      this.recipeIngredientService.setRecipeKey((args.rowData as RecipeModel).key as string);
      this.orderForm = this.createFormGroup(args.rowData as RecipeModel);
    }
    // new record
    if (args.requestType === 'save') {
      if (args.action === 'new') {
        this.submitClicked = true;
        if (this.orderForm.valid) {
          // send the new item to the add on the base service
          this.recipeService.addData(args.data as RecipeModel)
          // refresh the datasource
          this.recipeService.execute(this.state);
        } else {
          args.cancel = true;
        }
      }
      // edit an existing record
      else if (args.action === 'edit') {
        this.submitClicked = true;
        if (this.orderForm.valid) {
          // send the edit operation to the base service
          this.recipeService.updateData((args.data as RecipeModel).key as string, args.data as RecipeModel);
          // refresh the datasource
          this.recipeService.execute(this.state);
        } else {
          args.cancel = true;
        }
      }
    }
    // delete an existing record
    else if (args.requestType === 'delete') {
      var key = (args.data as RecipeModel[])[0].key as string;
      // send delete to the base service
      this.recipeService.deleteData(key);
      // refresh datasource
      this.recipeService.execute(this.state);
    }
  }

  // databind on the action complete
  actionComplete(args: DialogEditEventArgs): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      (<Dialog>args.dialog).dataBind();
    }
  }

// getters for the FormGroup for the grid to use for edit operations
  get name(): AbstractControl { return this.orderForm.get('name'); }
  get description(): AbstractControl { return this.orderForm.get('description'); }
  get ingredients(): AbstractControl { return this.orderForm.get('ingredients'); }
  get ethnicity(): AbstractControl { return this.orderForm.get('ethnicity'); }
  get instructions(): AbstractControl { return this.orderForm.get('instructions'); }
  get meal_time(): AbstractControl { return this.orderForm.get('meal_time'); }
}
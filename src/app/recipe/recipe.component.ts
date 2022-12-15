//Component: Recipe
//Contributor(s): 
//Summary: 

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



@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [ToolbarService, EditService]
})
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

  // dateValidator() {
  //   return (control: FormControl): null | Object => {
  //     return control.value && control.value.getFullYear &&
  //       (1900 <= control.value.getFullYear() && control.value.getFullYear() <= 2099) ? null : { OrderDate: { value: control.value } };
  //   }
  // }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.submitClicked = false;
      this.recipeIngredientService.setRecipeKey((args.rowData as RecipeModel).key as string);

      this.orderForm = this.createFormGroup(args.rowData as RecipeModel);
    }
    if (args.requestType === 'save') {
      if (args.action === 'new') {
        this.submitClicked = true;
        if (this.orderForm.valid) {
          this.recipeService.addData(args.data as RecipeModel)
          this.recipeService.execute(this.state);
        } else {
          args.cancel = true;
        }
      } else if (args.action === 'edit') {
        this.submitClicked = true;
        if (this.orderForm.valid) {
          this.recipeService.updateData((args.data as RecipeModel).key as string, args.data as RecipeModel);
          this.recipeService.execute(this.state);
        } else {
          args.cancel = true;
        }
      }
    } else if (args.requestType === 'delete') {

      var key = (args.data as RecipeModel[])[0].key as string;
      this.recipeService.deleteData(key);
      this.recipeService.execute(this.state);

    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      (<Dialog>args.dialog).dataBind();

    }
  }


  get name(): AbstractControl { return this.orderForm.get('name'); }

  get description(): AbstractControl { return this.orderForm.get('description'); }

  get ingredients(): AbstractControl { return this.orderForm.get('ingredients'); }

  get ethnicity(): AbstractControl { return this.orderForm.get('ethnicity'); }

  get instructions(): AbstractControl { return this.orderForm.get('instructions'); }

  get meal_time(): AbstractControl { return this.orderForm.get('meal_time'); }

}


// export interface IOrderModel {
//   description?: string;
//   ingredients?: string;
//   ethnicity?: string;
//   instructions?: string;
//   meal_time?: string;
// }

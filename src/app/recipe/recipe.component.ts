//Component: Recipe
//Contributor(s):
//Summary: 

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GroupSettings, GroupSettingsModel } from '@syncfusion/ej2-angular-grids';
import { GridComponent, EditService, ToolbarService, PageSettingsModel, IEditCell, Column, SaveEventArgs, DialogEditEventArgs } from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable, Subject, map, pipe } from 'rxjs';
import { ForeignKeyService } from '@syncfusion/ej2-angular-grids';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { LegendItemStyle } from '@syncfusion/ej2-angular-charts';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { Browser } from '@syncfusion/ej2-base';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipe.service';
import { RecipeModel } from '../models/recipe.model';
import { PageService } from '@syncfusion/ej2-angular-grids';



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
  // public args!: string;
  public orderData!: IOrderModel;

  @ViewChild('grid')
  public grid?: GridComponent;
  orderForm: any;
  data!: Object[];
  

  constructor(private recipeService: RecipeService) {

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.recipes = recipeService;
    this.state = { skip: 0, take: 10 };
    this.pageSettings = { pageSize: 10 };
  }

  ngOnInit(): void {

    this.recipeService.execute(this.state);
    
  }


  // Method that handles state changes (paging, sorting, etc.)
  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.recipeService.execute(state);
  }

  // Method that handles data changes in the grid
  public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state.action === 'add') {
      // Add new record to the database
      this.recipeService.addData(state.data as RecipeModel).subscribe(() => {
        state.endEdit?.();
      });

    } else if (state.action === 'edit') {
      // edit existing record using the key to identify the row to edit
      this.recipeService.updateData((state.data as RecipeModel).key as string, state.data as RecipeModel).subscribe(() => {
        state.endEdit?.();
      }, () => {
        this.grid!.closeEdit();
      });
    } else if (state.requestType === 'delete') {
      // delete record based off of the key
      var key = (state.data as RecipeModel[])[0].key as string;
      this.recipeService.deleteData(key).subscribe(() => {
        state.endEdit?.();
      });
    }
  }

  createFormGroup(data: RecipeModel): FormGroup {
    return new FormGroup({
      description: new FormControl(data.description, Validators.required),
      ethnicity: new FormControl(data.ethnicity),
      ingredients: new FormControl(data.ingredients, Validators.required),
      instructions: new FormControl(data.instructions),
      meal_time: new FormControl(data.meal_time)

    });
  }

  dateValidator() {
    return (control: FormControl): null | Object => {
      return control.value && control.value.getFullYear &&
        (1900 <= control.value.getFullYear() && control.value.getFullYear() <= 2099) ? null : { OrderDate: { value: control.value } };
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.submitClicked = false;

      this.orderForm = this.createFormGroup(args.data as RecipeModel);
    }
    if (args.requestType === 'save') {
      this.submitClicked = true;
      if (this.orderForm.valid) {
        args.data = this.orderForm.value;
      } else {
        args.cancel = true;
      }
    }
  }

  actionComplete(args: { requestType: string; dialog: Dialog; form: { elements: { namedItem: (arg0: string) => HTMLInputElement; }; }; }): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      if (Browser.isDevice) {
        args.dialog.height = window.innerHeight - 90 + 'px';
        (<Dialog>args.dialog).dataBind();
      }
      // Set initail Focus
      if (args.requestType === 'beginEdit') {
        (args.form.elements.namedItem('ingredients') as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
        (args.form.elements.namedItem('description') as HTMLInputElement).focus();
      }

    }

  }




  get description(): AbstractControl { return this.orderForm.get('description'); }

  get ingredients(): AbstractControl { return this.orderForm.get('ingredients'); }

  get ethnicity(): AbstractControl { return this.orderForm.get('ethnicity'); }

  get instructions(): AbstractControl { return this.orderForm.get('instructions'); }

  get meal_time(): AbstractControl { return this.orderForm.get('meal_time'); }



}


export interface IOrderModel {
  description?:string;
  ingredients?: string;
  ethnicity?:string;
  instructions?:string;
  meal_time?: string;
}




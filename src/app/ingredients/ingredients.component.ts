import { Component, OnInit } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { IngredientsService } from './ingredients.service';
import { EditService, PageService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'] ,
  providers: [ToolbarService, EditService, PageService]
})
export class IngredientsComponent implements OnInit {

  ingredients: IngredientModel[] = [];
  public editSettings: Object;
  public toolbar: string[];
  // public data: DataManager;

  constructor(private ingredientsService: IngredientsService) {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];

    this.ingredientsService.getIngredients().subscribe((data: IngredientModel []) => {
      console.log("Fetching ingredients");
      for (var ingredient of data) {
        console.log(ingredient);
        this.ingredients.push(ingredient);
      }
    }); 
  }



  ngOnInit(): void {

    // this.data = new DataManager({
    //   url: 'https://nutrition-genius-default-rtdb.firebaseio.com/ingredients.json',
    //   adaptor: new ODataAdaptor()
    // });
    
    // this.ingredientsService.getIngredients().subscribe((data: IngredientModel []) => {
    //   console.log("Fetching ingredients");
    //   for (var ingredient of data) {
    //     console.log(ingredient);
    //     this.ingredients.push(ingredient);
    //   }
    // }); 


    // this.ingredientsService.getIngredients().subscribe((data: IngredientModel[]) => {
    //   for (var ingredient of data) {
        
    //     this.ingredients.push(ingredient);
    //   }
    // });
  }

}

import { Component, OnInit } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { IngredientsService } from './ingredients.service';
import { EditService, PageService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { map } from 'rxjs';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'] ,
  providers: [ToolbarService, EditService, PageService]
})
export class IngredientsComponent implements OnInit {

  ingredients: any;
  public editSettings: Object;
  public toolbar: string[];

  constructor(private ingredientsService: IngredientsService) {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    //this.ingredients = ingredientsService.getIngredients();

  }



  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients(): void {
    this.ingredientsService.getIngredients().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.ingredients = data;
    });
  }

}

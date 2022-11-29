import { Component, OnInit } from '@angular/core';
import { IngredientModel } from '../models/ingredient.model';
import { IngredientsService } from './ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredients: IngredientModel[] = [];



  constructor(private ingredientsService: IngredientsService) {

  }



  ngOnInit(): void {
    this.ingredientsService.getIngredients().subscribe((data: IngredientModel[]) => {
      for (var ingredient of data) {
        this.ingredients.push(ingredient);
      }
    });
  }

}

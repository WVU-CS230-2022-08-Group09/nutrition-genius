import { Component, Input, OnInit } from '@angular/core';
import { view_all_recipes } from './recipe-database';
import { view_all_recipes_model } from './recipe-database.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  @Input() name:string;
  @Input() meal_type:string;
  @Input() servings:number;
  @Input() meal:string;
  @Input() ingredients:string;
  @Input() image:string;

  reel: view_all_recipes_model[] = [];

  constructor() {
    this.name = "";
    this.meal_type = '';
    this.servings = 0;
    this.meal = '';
    this.ingredients = '';
    this.image = '';

    for (var x of view_all_recipes) {
      console.log(x)
      this.reel.push(x)
    }
   }

  ngOnInit(): void {
  }

}

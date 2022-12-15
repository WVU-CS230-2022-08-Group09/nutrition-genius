//Module: App Routing
//Contributor(s): Aishat Banire, Makayla Davis, Colby Gallaher, Collin Lloyd, Steve Lough, Jacob Ochsenbein
//Summary: Main routing module for the entire webapp, provides routing to all components

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page/profile-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ContactComponent } from './contact/contact.component';
import { MainProfileComponent } from './profile-page/main-profile/main-profile.component';
import { MealsComponent } from './meals/meals.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page/sign-up-page.component';
import { RecipeIngredientComponent } from './recipe/recipe-ingredient.component';

//Routing names
const routes: Routes = [
  {path : '', component:HomePageComponent},
  {path : 'Profile', component:ProfilePageComponent},
  {path : 'About', component:AboutUsComponent},
  {path : 'Recipes', component:RecipeComponent},
  {path : 'Ingredients', component:IngredientsComponent},
  {path : 'SignUpPage', component:SignUpPageComponent},
  {path : 'Contact', component:ContactComponent},
  {path : 'Main', component:MainProfileComponent},
  {path : 'Meals', component:MealsComponent },
  {path : 'RecipeIngredient', component:RecipeIngredientComponent}

];

//NgModule wrapping
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

//Export
export class AppRoutingModule { }

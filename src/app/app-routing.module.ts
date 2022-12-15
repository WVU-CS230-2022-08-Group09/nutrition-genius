import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page/profile-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {NavBarComponent} from './home-page/nav-bar/nav-bar.component';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ContactComponent } from './contact/contact.component';
import { MainProfileComponent } from './profile-page/main-profile/main-profile.component';
import { MealsComponent } from './meals/meals.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page/sign-up-page.component';
import { RecipeIngredientComponent } from './recipe/recipe-ingredient.component';
import { CheckInComponent } from './profile-page/main-profile/check-in/check-in.component';
import { GoalsComponent } from './profile-page/main-profile/goals/goals.component';



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
  {path : 'RecipeIngredient', component:RecipeIngredientComponent},
  {path : 'Check', component:CheckInComponent},
  {path : 'Goals', component:GoalsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

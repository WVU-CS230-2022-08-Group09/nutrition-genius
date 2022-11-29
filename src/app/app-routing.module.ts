import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page/profile-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {NavBarComponent} from './home-page/nav-bar/nav-bar.component';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';




const routes: Routes = [
  {path : '', component:HomePageComponent},
  {path : 'Profile', component:ProfilePageComponent},
  {path : 'About', component:AboutUsComponent},
  {path : 'Recipes', component:RecipeComponent},
  {path : 'Ingredients', component:IngredientsComponent},
  {path : 'SignUpPage', component:SignUpPageComponent}
    

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

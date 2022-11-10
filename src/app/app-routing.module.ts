import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {NavBarComponent} from './home-page/nav-bar/nav-bar.component';
import { RecipeComponent } from './recipe/recipe.component';



const routes: Routes = [
  {path : '', component:HomePageComponent},
  {path : 'Recipes', component:RecipeComponent}
  /* {path : 'Profile', component:}, */ 
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

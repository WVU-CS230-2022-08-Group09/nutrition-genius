import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {NavBarComponent} from './home-page/nav-bar/nav-bar.component';



const routes: Routes = [
  {path : '', component:HomePageComponent},
  /* {path : 'Profile', component:}, */ 
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './home-page/nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page/profile-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RecipeComponent } from './recipe/recipe.component';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { GridModule, PagerModule, GroupService } from '@syncfusion/ej2-angular-grids';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    ProfilePageComponent,
    AboutUsComponent,
    RecipeComponent,
    IngredientsComponent,
    SignUpPageComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeGridModule,
    GridModule, PagerModule,
   HttpClientModule
  ],
  providers: [GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }

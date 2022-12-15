import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './home-page/nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page/profile-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RecipeComponent } from './recipe/recipe.component';
import { GridModule, PagerModule, GroupService } from '@syncfusion/ej2-angular-grids';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { FooterComponent } from './home-page/footer/footer.component';
import { MainProfileComponent } from './profile-page/main-profile/main-profile.component';
import { MealsComponent } from './meals/meals.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page/sign-up-page.component';
import { MealDetailComponent } from './meals/meal-detail/meal-detail.component';
import { MealRecipeComponent } from './meals/meal-recipe/meal-recipe.component';
import { RecipeIngredientComponent } from './recipe/recipe-ingredient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './profile-page/main-profile/settings/settings.component';
import { GoalsComponent } from './profile-page/main-profile/goals/goals.component';
import { CheckInComponent } from './profile-page/main-profile/check-in/check-in.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { FilterService } from '@syncfusion/ej2-angular-grids';
import { PageService } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    ProfilePageComponent,
    AboutUsComponent,
    RecipeComponent,
    IngredientsComponent,
    FooterComponent,
    MainProfileComponent,
    MealsComponent,
    SignUpPageComponent,
    MealDetailComponent,
    MealRecipeComponent,
    RecipeIngredientComponent,
    SettingsComponent,
    CheckInComponent,
    GoalsComponent,
    MealsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule, PagerModule,
   HttpClientModule,
   AngularFireModule.initializeApp(environment.firebase),
   AngularFireAuthModule,
   AngularFirestoreModule,
   AngularFireStorageModule,
   AngularFireDatabaseModule,
   FormsModule,
   ReactiveFormsModule,
   DropDownListModule,
   ButtonModule,
   MultiSelectModule,
   DropDownListModule,
   CheckBoxModule
  ],
  providers: [GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }

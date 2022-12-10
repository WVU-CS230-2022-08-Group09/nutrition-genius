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
import { GridModule, PagerModule, GroupService } from '@syncfusion/ej2-angular-grids';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { FooterComponent } from './home-page/footer/footer.component';
import { MainProfileComponent } from './profile-page/main-profile/main-profile.component';
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
    MainProfileComponent
    
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
  ],
  providers: [GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }

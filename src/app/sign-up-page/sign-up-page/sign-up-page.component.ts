//Component: Sign Up Page
//Contributor(s): Jacob Ochsenbein
//Summary: Component for the sign up page, contains user creation and authentication methods

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
 selector: "app-sign-up-page",
  templateUrl: "sign-up-page.component.html",
  styleUrls: ["./sign-up-page.component.css"]
})
export class SignUpPageComponent {
  
  //Objects used by AuthService
  public buttonClicked?:string;
  constructor(private authService:AuthService) {
  }

  //ngForm method that calls the signup method from AuthService
  onSubmit(data: NgForm){
    //Console output
    console.log("Credentials entered");
    //Signup method call
    this.authService.signup(data.value.email, data.value.password);
    //resets form for security purposes
    data.resetForm();
  }
}


//Component: Profile Page
//Contributor(s): Jacob Ochsenbein
//Summary: Component part of the profile page, which contains the authentication backend for logging into the profile page.

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/shared/auth.service';

//Component Wrapping
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

//Class Export
export class ProfilePageComponent {
  
  //Objects that build/use the AuthService signin method
  //Contains an ngForm loop for form verification
  public buttonClicked?: string;
  constructor(private authService:AuthService) { }

  onSubmit(data: NgForm){
    //Console output
    console.log("Credentials entered");
    
    //Function call
    this.authService.signin(data.value.email, data.value.password);
    
    //Resets form for security purposes
    data.resetForm();
  }

}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
 selector: "app-sign-up-page",
  templateUrl: "sign-up-page.component.html",
  styleUrls: ["./sign-up-page.component.css"]
})
export class SignUpPageComponent {
  public buttonClicked?:string;

  constructor(private authService:AuthService) {
  }

  onSubmit(data: NgForm){
    console.log("Credentials entered");
    this.authService.signup(data.value.email, data.value.password);
    data.resetForm();
  }
}


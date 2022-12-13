import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/services/shared/auth.response';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
 selector: "app-sign-up-page",
  templateUrl: "sign-up-page.component.html",
  styleUrls: ["./sign-up-page.component.css"]
})
export class SignUpPageComponent {
  public buttonClicked?:string;
  private authObservable!: Observable<AuthResponse>;

  constructor(private authService:AuthService) {
  }

  onSubmit(data: NgForm){
    console.log("Credentials entered");

    this.authObservable = this.authService.signup(data.value.name, data.value.email, data.value.password);

    this.authObservable.subscribe(
      (data:AuthResponse) =>{
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
      data.resetForm();
  }



}


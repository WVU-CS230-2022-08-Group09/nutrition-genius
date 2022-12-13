import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/services/shared/auth.response';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  public buttonClicked?: string;
  private authObservable!: Observable<AuthResponse>;

  constructor(private authService:AuthService) { }

  onSubmit(data: NgForm){
    console.log("Credentials entered");

    this.authObservable = this.authService.signin(data.value.email, data.value.password);
 
    this.authObservable.subscribe(
      (data:AuthResponse) =>{
        console.log(data);
      },
      (error: any) => {
          console.log(error);
        }
    );
      data.resetForm();
  }

}

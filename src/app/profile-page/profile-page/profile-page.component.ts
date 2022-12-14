import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  public buttonClicked?: string;

  constructor(private authService:AuthService) { }

  onSubmit(data: NgForm){
    console.log("Credentials entered");
    this.authService.signin(data.value.email, data.value.password);
    data.resetForm();
  }

}

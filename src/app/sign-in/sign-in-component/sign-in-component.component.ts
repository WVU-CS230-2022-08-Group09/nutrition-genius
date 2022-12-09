import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/shared/auth.service';

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.component.html',
  styleUrls: ['./sign-in-component.component.css']
})

export class SignInComponentComponent implements OnInit {

  constructor(
      public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}

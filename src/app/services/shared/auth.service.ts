import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthResponse } from "./auth.response";


@Injectable({
  providedIn: 'root'
})

export class AuthService{
  baseUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts"
  signUp: string = "signInWithCustomToken"
  signIn: string = "signInWithPassword"

  public constructor(private http:HttpClient){
    
  }

  public signup(name:string, email:string, password:string){
    const requestBody = {
      "name":name,
      "email": email,
      "password": password,
      "returnSecureToken": true
    }
    return this.http.post<AuthResponse>(this.baseUrl + ':' + this.signUp + '?' + 'key=' + environment.firebase.apiKey, requestBody);
  }

  public signin(email: string, password:string){
    const requestBody={
      "email":email,
      "password":password,
      "returnSecureToken": true,
    }
  
    return this.http.post<AuthResponse>(this.baseUrl + ':' + this.signIn + '?' + 'key=' + environment.firebase.apiKey, requestBody);
  
  }

}
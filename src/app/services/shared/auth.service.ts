import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthResponse } from "./auth.response";
import * as firebase from "firebase/compat";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  
  public signup(email:string, password:string){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      //Signed In
      const user = userCredential.user;
      onAuthStateChanged(auth, (user) => {
        if(user){
          const uid = user.uid;
        }
      })
    })

    //Error handling
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  public signin(email: string, password:string){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) =>{
      //Signed In
      const user = userCredential.user;
      onAuthStateChanged(auth, (user) => {
        if(user){
          //User is signed in
          const uid = user.uid;
        }
        else{
          //User is signed out
        }
      })
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }
}
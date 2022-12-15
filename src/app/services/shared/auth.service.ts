//Injectable: AuthService
//Contributor(s): Jacob Ochsenbein
//Summary: AuthService provides user creation (sign up) and authentication (logging in), as well as error handling for these two services

import { Injectable } from "@angular/core";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  
  //Signup page
  public signup(email:string, password:string){
    //Gets authentication token
    const auth = getAuth();

    //Creates a user with the given email & password with the authentication token
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      
      //User is created and signed in
      const user = userCredential.user;

    
      onAuthStateChanged(auth, (user) => {
        //Can be used to add various attributes to the user
        if(user){

          //User is signed in
          const uid = user.uid;

        }
        else{

          //User is signed out

        }
      })
    })

    //Error handling
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  //Signin page
  public signin(email: string, password:string){
    //Get authentication token
    const auth = getAuth();
    //Checks to see if token, email, and password match, if true, signs in user
    signInWithEmailAndPassword(auth, email, password).then((userCredential) =>{
      
      //Signed In
      const user = userCredential.user;

      //Used to assign various attributes to the user
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
    //Error Handling
    .catch((error) => {

      //Displays an error code and message on the console
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

    })
  }
}
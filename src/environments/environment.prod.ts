export const environment = {
  production: true
};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-2f_Tk0S8vGm4xeZB3IQ5ptb740Tdfz4",
  authDomain: "nutrition-genius.firebaseapp.com",
  databaseURL: "https://nutrition-genius-default-rtdb.firebaseio.com",
  projectId: "nutrition-genius",
  storageBucket: "nutrition-genius.appspot.com",
  messagingSenderId: "635447365282",
  appId: "1:635447365282:web:479bc667528ebb7f3e51fb",
  measurementId: "G-76TG9DZ5FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


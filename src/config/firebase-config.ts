// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLyHqNV-9TMcCCAnHB8cCYVZrSJyGlIAY",
  authDomain: "healthy-nutrition-cd61b.firebaseapp.com",
  projectId: "healthy-nutrition-cd61b",
  storageBucket: "healthy-nutrition-cd61b.appspot.com",
  messagingSenderId: "104395334648",
  appId: "1:104395334648:web:1d89cbed7c363c2a0aac0d"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
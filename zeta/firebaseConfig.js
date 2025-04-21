// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe7auF4lNVAIushKRhrE6g6riVNZLqUyI",
  authDomain: "zeta-socialmedia.firebaseapp.com",
  databaseURL: "https://zeta-socialmedia-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "zeta-socialmedia",
  storageBucket: "zeta-socialmedia.firebasestorage.app",
  messagingSenderId: "403485805252",
  appId: "1:403485805252:web:23553a6e3e0cde12ce9791"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const database = getDatabase(app)
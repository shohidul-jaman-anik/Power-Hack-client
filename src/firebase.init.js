// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYO_NbtT_bLuneNQhifPJ9VxLwLngCgeI",
  authDomain: "power-hacker.firebaseapp.com",
  projectId: "power-hacker",
  storageBucket: "power-hacker.appspot.com",
  messagingSenderId: "696424640982",
  appId: "1:696424640982:web:63a7b3492961bac36cb477"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwf_Dqz6JArBty44AMwjmqAP_pFXL3G1I",
    authDomain: "solutya-private-limited.firebaseapp.com",
    projectId: "solutya-private-limited",
    storageBucket: "solutya-private-limited.appspot.com",
    messagingSenderId: "178053578828",
    appId: "1:178053578828:web:d83e286ac83234a7caf4e9"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

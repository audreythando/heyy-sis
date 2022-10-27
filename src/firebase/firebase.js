
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0fxxEwjd9eA4Vbwei-kYvDeADzWOOZ5c",
    authDomain: "hey-sis-25ea2.firebaseapp.com",
    projectId: "hey-sis-25ea2",
    storageBucket: "hey-sis-25ea2.appspot.com",
    messagingSenderId: "829821341120",
    appId: "1:829821341120:web:47bd7bb8de8b9ebb6d4c25",
    measurementId: "G-JKCB4LV19H"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export default db;

export { provider, auth };
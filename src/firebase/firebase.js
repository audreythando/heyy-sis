
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiP6EZGwiiQ2DDjGJNgBQFdlgAXZA6Kag",
  authDomain: "hey-siss.firebaseapp.com",
  projectId: "hey-siss",
  storageBucket: "hey-siss.appspot.com",
  messagingSenderId: "312128516816",
  appId: "1:312128516816:web:0138138aede845bde364d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore();
const provider = new GoogleAuthProvider();
export {auth,provider};
export default db;
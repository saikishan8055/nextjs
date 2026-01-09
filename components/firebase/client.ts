// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import App from "next/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkkiHGFbs-9E15eWyXSzec4QHrQI-iQ6A",
  authDomain: "preparewise-f1a7e.firebaseapp.com",
  projectId: "preparewise-f1a7e",
  storageBucket: "preparewise-f1a7e.firebasestorage.app",
  messagingSenderId: "212690686622",
  appId: "1:212690686622:web:141f4c5fe2e0ef00d7218f",
  measurementId: "G-JF6ZCBF4SQ"
};

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app); 
export const db = getFirestore(app)
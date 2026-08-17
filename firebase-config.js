// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRD15-HzvmCvt5dOnEgsGSTkE5AN-16DM",
  authDomain: "aulaactiva-ca551.firebaseapp.com",
  projectId: "aulaactiva-ca551",
  storageBucket: "aulaactiva-ca551.firebasestorage.app",
  messagingSenderId: "797030185664",
  appId: "1:797030185664:web:10f7634bf3feb7f1248b25",
  measurementId: "G-59W4K0K24C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC00zNhB6X2a7AlVEffDU5j0TMLFKk3zmQ",
  authDomain: "drinkup-cs145.firebaseapp.com",
  databaseURL: "https://drinkup-cs145-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "drinkup-cs145",
  storageBucket: "drinkup-cs145.appspot.com",
  messagingSenderId: "123718921446",
  appId: "1:123718921446:web:06b950b3a930a880d65f27",
  measurementId: "G-CQF6ECM2MW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
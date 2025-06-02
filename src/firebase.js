// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCeXfk_eUgWuSFH3xM0qs8XT64EmhsVR7Y",
  authDomain: "fly-n-dodge.firebaseapp.com",
  databaseURL: "https://fly-n-dodge-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fly-n-dodge",
  storageBucket: "fly-n-dodge.firebasestorage.app",
  messagingSenderId: "231276668908",
  appId: "1:231276668908:web:2b292e7fa195fe0229c2c9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);

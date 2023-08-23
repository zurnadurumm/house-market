// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAnH3r0jVZBg0BmFljXhvYrBw1BdNh9I0",
  authDomain: "house-markeplace-c8499.firebaseapp.com",
  projectId: "house-markeplace-c8499",
  storageBucket: "house-markeplace-c8499.appspot.com",
  messagingSenderId: "239946930664",
  appId: "1:239946930664:web:641ffe2bb60ab52e9aec5d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

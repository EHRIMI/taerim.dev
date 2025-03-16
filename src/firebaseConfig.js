import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJGktgbYRQtqafAaoJuI7bCA_sbJTho",
  authDomain: "taerim-dev.firebaseapp.com",
  projectId: "taerim-dev",
  storageBucket: "taerim-dev.appspot.com",
  messagingSenderId: "664121660704",
  appId: "1:664121660704:web:fef26ed46dc14968083345",
  measurementId: "G-67G6TQYBRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore database

export { db };
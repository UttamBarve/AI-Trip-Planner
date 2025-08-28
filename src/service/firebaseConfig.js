// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ub-ai-trip-planner.firebaseapp.com",
  projectId: "ub-ai-trip-planner",
  storageBucket: "ub-ai-trip-planner.firebasestorage.app",
  messagingSenderId: "645648580",
  appId: "1:645648580:web:18e0982f7e7a51c0523991",
  measurementId: "G-BRYRBTJFMB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0FOzQdTlGq23s8Ds_kLMZ0te8juMzmas",
  authDomain: "prepwise-f9096.firebaseapp.com",
  projectId: "prepwise-f9096",
  storageBucket: "prepwise-f9096.firebasestorage.app",
  messagingSenderId: "5098502380",
  appId: "1:5098502380:web:5d99c50de6f834017b8dc9",
  measurementId: "G-5FTWG63G5D"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
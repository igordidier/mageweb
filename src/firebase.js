// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDuuhyH2CGdF5RkFF_VXs-dF3CHVtgYKw",
  authDomain: "mage-7b080.firebaseapp.com",
  projectId: "mage-7b080",
  storageBucket: "mage-7b080.appspot.com",
  messagingSenderId: "644507389796",
  appId: "1:644507389796:web:553d0f5c1bfc90aefbf471",
  measurementId: "G-3X4GWDH1JT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNB-N7foukim0jAPFipQDI_5ymN5S-DKw",
  authDomain: "inventory-tracker-efc52.firebaseapp.com",
  projectId: "inventory-tracker-efc52",
  storageBucket: "inventory-tracker-efc52.appspot.com",
  messagingSenderId: "478638491429",
  appId: "1:478638491429:web:2fba7c59b9c4a424ee7ccc",
  measurementId: "G-KPXDW0N326"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};
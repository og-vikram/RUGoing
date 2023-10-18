// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-oJ0CpAPqF_KsgG6yoRYwFWqMiuipII8",
  authDomain: "rugoing-6c4b2.firebaseapp.com",
  projectId: "rugoing-6c4b2",
  storageBucket: "rugoing-6c4b2.appspot.com",
  messagingSenderId: "94090669475",
  appId: "1:94090669475:web:d30961df76c6627dfdfe16",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

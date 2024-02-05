// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "wikitrip-dc0eb.firebaseapp.com",
  projectId: "wikitrip-dc0eb",
  storageBucket: "wikitrip-dc0eb.appspot.com",
  messagingSenderId: "794718813858",
  appId: "1:794718813858:web:55e15f48a69eeddde521fb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

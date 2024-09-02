// Import the functions you need from the SDKs you need
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlXn3J94yIe2wU8HqRRKysCOTB_L9rXBs",
  authDomain: "react-work-58a4c.firebaseapp.com",
  projectId: "react-work-58a4c",
  storageBucket: "react-work-58a4c.appspot.com",
  messagingSenderId: "781014042893",
  appId: "1:781014042893:web:cc29476d10b9ccf5754844",
  measurementId: "G-DG5GW0D176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app , analytics , auth , createUserWithEmailAndPassword , signInWithEmailAndPassword}
// Import the functions you need from the SDKs you need
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlXn3J94yIe2wU8HqRRKysCOTB_L9rXBs",
  authDomain: "react-work-58a4c.firebaseapp.com",
  projectId: "react-work-58a4c",
  storageBucket: "react-work-58a4c.appspot.com",
  messagingSenderId: "781014042893",
  appId: "1:781014042893:web:cc29476d10b9ccf5754844",
  measurementId: "G-DG5GW0D176",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  db,
  app,
  doc,
  auth,
  setDoc,
  analytics,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};

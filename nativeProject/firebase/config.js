import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCTqsmKzyHGq-91U-DBmiBajmMbEpqs3tQ",
  authDomain: "nativeproject-676eb.firebaseapp.com",
  projectId: "nativeproject-676eb",
  storageBucket: "nativeproject-676eb.appspot.com",
  messagingSenderId: "223817704644",
  appId: "1:223817704644:web:e83d2a2eee9b740a141591",
  measurementId: "G-R6BY9TRVPD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

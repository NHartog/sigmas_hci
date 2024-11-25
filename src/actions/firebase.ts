import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcSebKymkTGqdBFQOI5XQMiP7HAIEyLLg",
  authDomain: "sigmas-hci.firebaseapp.com",
  projectId: "sigmas-hci",
  storageBucket: "sigmas-hci.firebasestorage.app",
  messagingSenderId: "754580861031",
  appId: "1:754580861031:web:5c5d47ee8121cae8e1a4c2",
  measurementId: "G-RXZFYC9H89"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

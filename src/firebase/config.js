import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5AGa7ytQ5Anc4Agp_ORwIc3ubkDaCbFA",
  authDomain: "rn-social-app-d05db.firebaseapp.com",
  projectId: "rn-social-app-d05db",
  storageBucket: "rn-social-app-d05db.appspot.com",
  messagingSenderId: "207872487132",
  appId: "1:207872487132:web:0673c23e083d01787e8e19",
  measurementId: "G-ZS5TDPZBB2",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

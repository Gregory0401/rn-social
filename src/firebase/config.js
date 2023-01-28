import * as firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFauNPYaTGMGWKEvyHdTh8m_kfhKDiQuU",
  authDomain: "rn-social.firebaseapp.com",
  databaseURL: "https://rn-social.firebaseio.com",
  projectId: "rn-social",
  storageBucket: "rn-social.appspot.com",
  messagingSenderId: "974670373504",
  appId: "1:974670373504:web:fe01e1286f5ad11ff0fc65",
  measurementId: "A-DS5TDPZBB4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

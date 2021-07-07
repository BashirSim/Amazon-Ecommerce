// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCgkY1ejBTbUE3GxpjtLuEUE_mM3AcEQaU",
  authDomain: "clone-v2-6d54b.firebaseapp.com",
  projectId: "clone-v2-6d54b",
  storageBucket: "clone-v2-6d54b.appspot.com",
  messagingSenderId: "954202491263",
  appId: "1:954202491263:web:6739015fef8ab3f5c9b24a",
  measurementId: "G-45XERD4PDP",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;

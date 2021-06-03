import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClj_f-EeMKMa07nQzKhjkK3AFBO0SWnT8",
  authDomain: "to-do-app-2e570.firebaseapp.com",
  projectId: "to-do-app-2e570",
  storageBucket: "to-do-app-2e570.appspot.com",
  messagingSenderId: "714051081016",
  appId: "1:714051081016:web:7d167554d7b9072c9927cd",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

//Firestore
export const FirebaseDB = firebaseApp.firestore();

// Google Auth
export const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsp1jcG1fifv9LWktLJZOzAjWP_P1mTTg",
  authDomain: "final-project-carpooling.firebaseapp.com",
  projectId: "final-project-carpooling",
  storageBucket: "final-project-carpooling.appspot.com",
  messagingSenderId: "1047500286995",
  appId: "1:1047500286995:web:d99eec97e9e7a9c3cba3e6",
  measurementId: "G-G5XL8NF1CB",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "###################################",
  authDomain: "#########################",
  projectId: "####################",
  storageBucket: "#######################",
  messagingSenderId: "##################",
  appId: "############################"
};

// Initialize
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth, firebase };

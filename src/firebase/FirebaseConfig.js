import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhI-ZelzlLooHu2N0GBRhK0u6xHoPpf-M",
  authDomain: "cryptobase-4e8df.firebaseapp.com",
  projectId: "cryptobase-4e8df",
  storageBucket: "cryptobase-4e8df.appspot.com",
  messagingSenderId: "275896078933",
  appId: "1:275896078933:web:85d60c4e2f641fe736badc",
  measurementId: "G-FTESJRCV5X",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}


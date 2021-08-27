import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-lgKTcMriy4iuHoDxr9HWtxEVCNHQDPQ",
    authDomain: "chat-labenu-d0a5f.firebaseapp.com",
    projectId: "chat-labenu-d0a5f",
    storageBucket: "chat-labenu-d0a5f.appspot.com",
    messagingSenderId: "159417898397",
    appId: "1:159417898397:web:627b84b7a98f7bf66f0b74"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db }
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db }

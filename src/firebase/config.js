/*import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyC5w9-gv2RYiQJYM189wDDikGhYHcUY3Pg",
    authDomain: "aisuru-app.firebaseapp.com",
    projectId: "aisuru-app",
    storageBucket: "aisuru-app.appspot.com",
    messagingSenderId: "582775637210",
    appId: "1:582775637210:web:d539ed4c3c83ec784991e3"
  };



let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth, app};*/

import Firebase from "firebase";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC5w9-gv2RYiQJYM189wDDikGhYHcUY3Pg",
    authDomain: "aisuru-app.firebaseapp.com",
    projectId: "aisuru-app",
    storageBucket: "aisuru-app.appspot.com",
    messagingSenderId: "582775637210",
    appId: "1:582775637210:web:d539ed4c3c83ec784991e3"
};

export default Firebase.initializeApp(firebaseConfig);

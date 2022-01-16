import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBYbVx-QQgMt2ivfc8Q0m4SXfRgYXtqB_k",
    authDomain: "portal-noticias-c9bf1.firebaseapp.com",
    projectId: "portal-noticias-c9bf1",
    storageBucket: "portal-noticias-c9bf1.appspot.com",
    messagingSenderId: "166340099348",
    appId: "1:166340099348:web:d6653e96cb9e4122449601"
});

const db = firebase.firestore();

export {db};
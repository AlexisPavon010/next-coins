import * as firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// import 'firebase/analytics';

let googleAuthProvider = {};
let facebookAuthProvider = {};

var firebaseConfig = {
    apiKey: "AIzaSyDtln2KCrL5a5dbeD89SCJgZdFy3MGhZgU",
    authDomain: "crypto-coins-b0085.firebaseapp.com",
    projectId: "crypto-coins-b0085",
    storageBucket: "crypto-coins-b0085.appspot.com",
    messagingSenderId: "1005267153997",
    appId: "1:1005267153997:web:f87ebeb14f333f63a6d804",
    measurementId: "G-BGY1PM2N99"
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

// const firebaseAnalytics = app.analytics();
googleAuthProvider = new firebase.auth.GoogleAuthProvider();
facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore()
const storage = firebase.storage();

export {app, db, storage, googleAuthProvider, facebookAuthProvider };
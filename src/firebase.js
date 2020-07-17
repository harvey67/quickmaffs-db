import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAHN7qi76sqh-ZHSlAGryJEbTvxcsvFJaY",
    authDomain: "user-database-test-9ee1d.firebaseapp.com",
    databaseURL: "https://user-database-test-9ee1d.firebaseio.com",
    projectId: "user-database-test-9ee1d",
    storageBucket: "user-database-test-9ee1d.appspot.com",
    messagingSenderId: "425239506606",
    appId: "1:425239506606:web:decf3cc0780d2d8e9d073f"
};

//const fire = firebase.initializeApp(firebase);
firebase.initializeApp(firebaseConfig);

export default firebase;
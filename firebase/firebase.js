import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCyJakMMiEiKwFVwUHSGzGIM8oDNaF3d4M",
    authDomain: "repicemagic.firebaseapp.com",
    projectId: "repicemagic",
    storageBucket: "repicemagic.appspot.com",
    messagingSenderId: "545524448774",
    appId: "1:545524448774:web:aed3afd860178d20dc8d87"
  };
  

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
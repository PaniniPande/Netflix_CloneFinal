import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyASqRQ-5NrKH9abwQpEI1-InlUcG8d2Cc4",
    authDomain: "netflix-clone-6aeb6.firebaseapp.com",
    projectId: "netflix-clone-6aeb6",
    storageBucket: "netflix-clone-6aeb6.appspot.com",
    messagingSenderId: "359445872305",
    appId: "1:359445872305:web:7e63a8d364bc7dde84ec90"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();


  export{ auth};
  export default db;
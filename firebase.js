import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyByQ-6nQQ3LCfmdqbNpKqEHNQ0SBbMQHHc",
    authDomain: "motoapp-80898.firebaseapp.com",
    projectId: "motoapp-80898",
    storageBucket: "motoapp-80898.appspot.com",
    messagingSenderId: "142119301334",
    appId: "1:142119301334:web:b7efb6b14f52dd5bdad977",
    measurementId: "G-KWSH68F16Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //porta de entrada para a base de dados do projeto
  const db = firebase.firestore();

  //porta de entrada para o sistema de autenticação do firebase
  const auth = firebase.auth();

  export default {
    db, firebase, auth
  }
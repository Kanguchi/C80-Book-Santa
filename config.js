import * as firebase from 'firebase';
require('@firebase/firestore')

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCZxUPtbY-uD_ctso_i_0KQ8d_CpmkELUo",
    authDomain: "t-rex-game-e12fb.firebaseapp.com",
    databaseURL: "https://t-rex-game-e12fb.firebaseio.com",
    projectId: "t-rex-game-e12fb",
    storageBucket: "t-rex-game-e12fb.appspot.com",
    messagingSenderId: "324995144715",
    appId: "1:324995144715:web:772c2b95f7df53c5943b0e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
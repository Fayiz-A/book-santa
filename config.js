import firebase from 'firebase';

require('@firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
   apiKey: "AIzaSyBq-uB-WoKX8uv6y6-iG8R_k0mzOiheMNg",
   authDomain: "book-santa-97d61.firebaseapp.com",
   projectId: "book-santa-97d61",
   storageBucket: "book-santa-97d61.appspot.com",
   messagingSenderId: "231311976841",
   appId: "1:231311976841:web:566b72c147b3266ab59958"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
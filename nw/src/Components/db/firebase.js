import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA4oeZCX95NxQ9CqmaEMwiXjddXSXVE0yE",
  authDomain: "postman-ca477.firebaseapp.com",
  databaseURL: "https://postman-ca477.firebaseio.com",
  projectId: "postman-ca477",
  storageBucket: "postman-ca477.appspot.com",
  messagingSenderId: "770780659398",
  appId: "1:770780659398:web:9ba4a382d84c9b7564e1c7"
};

firebase.initializeApp(firebaseConfig);
export default firebase;

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAj4Pxb57RfOHzna3klxrzlS1kctwr9zGU",
  authDomain: "my-plantwatering-db.firebaseapp.com",
  databaseURL: "https://my-plantwatering-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-plantwatering-db",
  storageBucket: "my-plantwatering-db.appspot.com",
  messagingSenderId: "745472684134",
  appId: "1:745472684134:web:5b89c2a1a1be1bdb3fbda7",
  measurementId: "${config.measurementId}"
};

let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
}else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth, firebaseConfig }


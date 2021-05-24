import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyD0Ybw_jz_d2oj8Ra5es3JoSyWHWot8XL4",
  authDomain: "betastore-36dd0.firebaseapp.com",
  databaseURL: "https://betastore-36dd0-default-rtdb.firebaseio.com",
  projectId: "betastore-36dd0",
  storageBucket: "gs://betastore-36dd0.appspot.com",
  messagingSenderId: "405763169668",
  appId: "1:405763169668:web:e5112cc8985b318bcf11d1",
  measurementId: "G-8B5MDVD9RQ"
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

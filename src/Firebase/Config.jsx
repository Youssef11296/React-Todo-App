import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAYJ8KdtNC1THUP-43DKQ-clHBpuSqPyuY",
  authDomain: "react-todo-app-24b7b.firebaseapp.com",
  databaseURL: "https://react-todo-app-24b7b.firebaseio.com",
  projectId: "react-todo-app-24b7b",
  storageBucket: "react-todo-app-24b7b.appspot.com",
  messagingSenderId: "159403197487",
  appId: "1:159403197487:web:d7d3e233126e02eb1fb2da",
  measurementId: "G-5F424BHBJ4",
});

const db = firebaseApp.firestore();

export default db;

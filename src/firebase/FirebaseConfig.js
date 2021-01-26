import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyCMvFhxUC--kGtJ5RRj26vwwo23ZqccXGQ",
  authDomain: "address-book-e8460.firebaseapp.com",
  databaseURL: "https://address-book-e8460-default-rtdb.firebaseio.com",
  projectId: "address-book-e8460",
  storageBucket: "address-book-e8460.appspot.com",
  messagingSenderId: "793498856116",
  appId: "1:793498856116:web:6569e27884f7d00c8dc5e1",
};

firebase.initializeApp(firebaseConfig);

const firebaseWithConfig = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const FirebaseAuth = firebaseWithConfig.auth();

// firebase.database().ref('users/'+user.iud/contacts/this.state.contactId).set({
//   title: this.state.answers.title,
//   location: this.state.answers.location,
//   description: this.state.answers.description
// });

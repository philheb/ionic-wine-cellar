import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBGxbxC-QavMb4lCIjE9XbVq9flogqVrSM",
  authDomain: "my-wine-cave.firebaseapp.com",
  databaseURL: "https://my-wine-cave.firebaseio.com",
  projectId: "my-wine-cave",
  storageBucket: "my-wine-cave.appspot.com",
  messagingSenderId: "658036484444",
  appId: "1:658036484444:web:d0606022a8b9c2f5c3f999",
  measurementId: "G-X3MVC16NV8",
};

firebase.initializeApp(config);

export const login = async (email: string, password: string) => {
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log(res);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

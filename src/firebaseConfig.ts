import * as firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(config);

export const getCurrentUser = async () => {
  return firebase.auth().currentUser;
};

// export const login = async (email: string, password: string) => {
//   try {
//     const res = await firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password);
//     console.log(res);
//     return true;
//   } catch (err) {
//     throw err;
//   }
// };

export default firebase;

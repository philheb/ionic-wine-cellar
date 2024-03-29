import React, { useEffect, useState } from "react";
import firebase from "../firebaseConfig";
type ContextProps = {
  user: firebase.User | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
};
export const AuthContext = React.createContext<Partial<ContextProps>>({});
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null as firebase.User | null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      setUser(user);
      setLoadingAuthState(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// import React, { useState, useEffect } from "react";
// import firebase from "../firebaseConfig";

// import AuthContext from "./auth-context";

// const AuthContextProvider: React.FC = (props) => {
//   const [user, setUser] = useState(null as firebase.User | null);
//   const [loadingAuthState, setLoadingAuthState] = useState(true);

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged((user: any) => {
//       setUser(user);
//       setLoadingAuthState(false);
//     });
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         authenticated: user !== null,
//         setUser,
//         loadingAuthState,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;

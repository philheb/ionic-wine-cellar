import React, { useState, useRef, useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonRow,
  IonCol,
  IonToast,
  IonLoading,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../firebaseConfig";
// import { login } from "../firebaseConfig";
import { AuthContext } from "../context/AuthContextProvider";

const Login: React.FC = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const history = useHistory();

  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginHandler = async () => {
    setIsLoading(true);
    const email = emailRef.current?.value?.toString();
    const password = passwordRef.current?.value?.toString();

    if (!email || !password) {
      //TODO: Better error handling
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        authCtx.setUser(res);
        console.log(res, "res");
        setMessage("You have successfully signed in");
        setShowToast(true);
        setIsLoading(false);
        history.push("/wine-list");
      })
      .catch((error) => {
        console.log(error.message);
        setMessage(error.message);
        setShowToast(true);
        setIsLoading(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Wine Cave</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonLoading isOpen={isLoading} message='Signing in...' duration={0} />

      <IonContent>
        <IonText>
          <h2 className='ion-padding'>Login</h2>
        </IonText>
        <IonList>
          <IonItem>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput type='email' ref={emailRef} />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Password</IonLabel>
            <IonInput type='password' ref={passwordRef} />
          </IonItem>
          <IonRow className='ion-text-center ion-margin-top'>
            <IonCol>
              <IonButton
                expand='block'
                className='ion-margin'
                onClick={loginHandler}
              >
                Login
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className='ion-text-center'>
            <IonCol>
              <IonText>
                <p>
                  Don't have an account yet? <Link to='/register'>Sign up</Link>{" "}
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonList>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => {
          setShowToast(false);
          setMessage("");
        }}
        message={message}
        duration={3000}
      />
    </IonPage>
  );
};

export default Login;

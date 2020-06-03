import React, { useState, useRef } from "react";
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
} from "@ionic/react";
import { Link } from "react-router-dom";
import { login } from "../firebaseConfig";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const loginHandler = async () => {
    const email = emailRef.current?.value?.toString();
    const password = passwordRef.current?.value?.toString();

    if (!email || !password) {
      //TODO: Better error handling
      return;
    }

    const res = await login(email, password);
    if (res) {
      setMessage("You successfully logged in!");
      setShowToast(true);
    } else {
      setMessage(
        "There was a problem logging in. Check your email and password or create an account."
      );
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Wine Cave</IonTitle>
        </IonToolbar>
      </IonHeader>
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

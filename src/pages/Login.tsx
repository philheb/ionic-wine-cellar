import React, { useRef } from "react";
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
} from "@ionic/react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const loginHandler = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email, password);
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
    </IonPage>
  );
};

export default Login;

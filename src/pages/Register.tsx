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
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonToast,
} from "@ionic/react";
import { eye, eyeOff, personAdd } from "ionicons/icons";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const nameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const [eyeIcon, setEyeIcon] = useState<string>(eye);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const registerHandler = () => {
    setMessage("");
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      //TODO: Better error handling
      setMessage("Please fill out all the fields.");
      setShowToast(true);
      return;
    }
  };

  const showPasswordHandler = () => {
    if (eyeIcon === eye) {
      setEyeIcon(eyeOff);
      setShowPassword(true);
    } else if (eyeIcon === eyeOff) {
      setEyeIcon(eye);
      setShowPassword(false);
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
          <h2 className='ion-padding'>
            Sign Up <IonIcon icon={personAdd} size='small' color='primary' />
          </h2>
        </IonText>
        <IonList>
          <IonItem>
            <IonLabel position='floating'>Name</IonLabel>
            <IonInput type='text' ref={nameRef} required />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput type='email' ref={emailRef} required />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Password</IonLabel>
            <IonInput
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              required
            />
            <IonButton
              fill='clear'
              slot='end'
              className='ion-align-self-end'
              onClick={showPasswordHandler}
            >
              <IonIcon icon={eyeIcon} slot='icon-only' />
            </IonButton>
          </IonItem>
        </IonList>
        <IonRow className='ion-text-center ion-margin-top'>
          <IonCol>
            <IonButton
              className='ion-margin'
              onClick={registerHandler}
              expand='block'
            >
              Login
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className='ion-text-center'>
          <IonCol>
            <IonText>
              <p>
                Already have an account? <Link to='/login'>Log In</Link>{" "}
              </p>
            </IonText>
          </IonCol>
        </IonRow>
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

export default Register;

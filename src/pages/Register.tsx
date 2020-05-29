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
} from "@ionic/react";
import { eye, eyeOff, personAdd } from "ionicons/icons";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const nameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const [eyeIcon, setEyeIcon] = useState<string>(eye);
  const [showPassword, setShowPassword] = useState(false);

  const registerHandler = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(name, email, password);
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
            <IonInput type='text' ref={nameRef} />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput type='email' ref={emailRef} />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Password</IonLabel>
            <IonInput
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
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
    </IonPage>
  );
};

export default Register;

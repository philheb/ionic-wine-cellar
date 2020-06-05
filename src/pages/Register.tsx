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
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonToast,
  IonNote,
  IonLoading,
} from "@ionic/react";
import { eye, eyeOff, personAdd } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import firebase from "../firebaseConfig";
import { AuthContext } from "../context/AuthContextProvider";

const Register: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const nameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const [eyeIcon, setEyeIcon] = useState<string>(eye);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordNoteColor, setPasswordNoteColor] = useState("medium");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerHandler = async () => {
    setIsLoading(true);
    setMessage("");
    setPasswordNoteColor("medium");
    setShowToast(false);
    const name = nameRef.current?.value?.toString().trim();
    const email = emailRef.current?.value?.toString().trim();
    const password = passwordRef.current?.value?.toString().trim();

    if (!name || !email || !password) {
      //TODO: Better error handling
      setMessage("Please fill out all the fields.");
      setShowToast(true);
      return;
    }

    if (password.length < 6) {
      setPasswordNoteColor("danger");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential: firebase.auth.UserCredential) => {
        authCtx.setUser(userCredential);
        const db = firebase.firestore();
        db.collection("Users")
          .doc(userCredential.user!.uid)
          .set({
            email: email,
            name: name,
          })
          .then(() => {
            console.log("ok");
            setMessage("You have register successfully!");
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
      });
    // try {
    //   const res = await register(name, email, password);
    //   authCtx.setUser(res);
    //   const db = firebase.firestore();
    //   db.collection("Users").doc(res.user!.uid).set({
    //     email: email,
    //     name: name,
    //   });
    //   setMessage("You have register successfully!");
    //   setShowToast(true);
    //   setIsLoading(false);
    // } catch (err) {
    //   setMessage(err.message);
    //   setShowToast(true);
    //   setIsLoading(false);
    // }
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
      <IonLoading isOpen={isLoading} message='Registering...' duration={0} />
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
          <IonNote color={passwordNoteColor}>
            Must be at least 6 characters
          </IonNote>
        </IonList>

        <IonRow className='ion-text-center ion-margin-top'>
          <IonCol>
            <IonButton
              className='ion-margin'
              onClick={registerHandler}
              expand='block'
              type='submit'
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

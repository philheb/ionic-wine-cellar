import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonItem,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonText,
  IonIcon,
  isPlatform,
} from "@ionic/react";
import ImagePicker from "../components/ImagePicker";
import { Photo, WineType } from "../models/Bottle";

import WineContext from "../data/wine-context";
import { wine } from "ionicons/icons";

const NewWine: React.FC = () => {
  const wineCtx = useContext(WineContext);

  const [takenPhoto, setTakenPhoto] = useState<Photo>();
  const [chosenWineType, setChosenWineType] = useState<WineType>("red");

  const nameRef = useRef<HTMLIonInputElement>(null);
  const priceRef = useRef<HTMLIonInputElement>(null);
  const noteRef = useRef<HTMLIonTextareaElement>(null);

  const history = useHistory();

  const photoPickHandler = (photo: Photo) => {
    setTakenPhoto(photo);
  };

  const selectWineTypeHandler = (event: CustomEvent) => {
    const selectedWineType = event.detail.value;
    setChosenWineType(selectedWineType);
  };

  const addWineHandler = () => {
    const enteredName = nameRef.current!.value!.toString();
    const enteredPrice = Number(priceRef.current!.value);
    const enteredNote = noteRef.current!.value;
    if (!enteredName || !chosenWineType || !takenPhoto) {
      // TODO: alert in incomplete field(s)
      return;
    }
    const newBottle = {
      name: enteredName,
      type: chosenWineType,
      price: enteredPrice,
      photo: takenPhoto,
      note: enteredNote,
    };
    wineCtx.addBottle(newBottle);
    history.length > 0 ? history.goBack() : history.replace("/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={isPlatform("android") ? "primary" : ""}>
          <IonTitle>My Wine Cave</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonText>
            <h2 className='ion-padding'>
              Add a bottle <IonIcon icon={wine} size='small' color='primary' />
            </h2>
          </IonText>
          <IonItem>
            <IonLabel position='stacked'>Name *</IonLabel>
            <IonInput
              type='text'
              autocapitalize='true'
              ref={nameRef}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Type *</IonLabel>
            <IonSelect onIonChange={selectWineTypeHandler}>
              <IonSelectOption value='red'>Red</IonSelectOption>
              <IonSelectOption value='white'>White</IonSelectOption>
              <IonSelectOption value='rosé'>Rosé</IonSelectOption>
              <IonSelectOption value='sparkling'>Sparkling</IonSelectOption>
              <IonSelectOption value='natural'>Natural</IonSelectOption>
              <IonSelectOption value='other'>Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Price</IonLabel>
            <IonInput
              type='number'
              inputMode='decimal'
              ref={priceRef}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='stacked'>Note</IonLabel>
            <IonTextarea
              ref={noteRef}
              rows={2}
              placeholder='Location, Year, Pairing, etc.'
            ></IonTextarea>
          </IonItem>
        </IonList>
        <IonGrid>
          <IonRow className='ion-text-center ion-margin-top'>
            <IonCol>
              <ImagePicker onImagePick={photoPickHandler} />
            </IonCol>
          </IonRow>
          <IonRow className='ion-text-center ion-margin-top'>
            <IonCol>
              <IonButton
                color='primary'
                expand='block'
                onClick={addWineHandler}
              >
                Add Wine
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewWine;

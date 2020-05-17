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
} from "@ionic/react";
import ImagePicker from "../components/ImagePicker";
import { Photo, WineType } from "../models/Bottle";

import WineContext from "../data/wine-context";

const NewWine: React.FC = () => {
  const wineCtx = useContext(WineContext);

  const [takenPhoto, setTakenPhoto] = useState<Photo>();
  const [chosenWineType, setChosenWineType] = useState<WineType>("red");

  const nameRef = useRef<HTMLIonInputElement>(null);
  const priceRef = useRef<HTMLIonInputElement>(null);

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

    if (!enteredName || !enteredPrice || !chosenWineType || !takenPhoto) {
      // TODO: alert in incomplete field(s)
      return;
    }

    const newBottle = {
      name: enteredName,
      type: chosenWineType,
      price: enteredPrice,
      photo: takenPhoto,
    };

    wineCtx.addBottle(newBottle);

    // history.replace("/wine-list");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add A Bottle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position='floating'>Name</IonLabel>
            <IonInput type='text' ref={nameRef}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Type</IonLabel>
            <IonSelect onIonChange={selectWineTypeHandler}>
              <IonSelectOption value='red'>Red</IonSelectOption>
              <IonSelectOption value='white'>White</IonSelectOption>
              <IonSelectOption value='rosé'>White</IonSelectOption>
              <IonSelectOption value='sparkling'>Sparkling</IonSelectOption>
              <IonSelectOption value='natural'>Natural</IonSelectOption>
              <IonSelectOption value='other'>Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Price</IonLabel>
            <IonInput type='number' ref={priceRef}></IonInput>
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

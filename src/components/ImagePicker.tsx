import React, { useState, useRef } from "react";
import { IonIcon, IonButton, IonLabel } from "@ionic/react";
import {
  Capacitor,
  CameraResultType,
  CameraSource,
  Plugins,
} from "@capacitor/core";
import { imageOutline, camera } from "ionicons/icons";
import "./ImagePicker.css";

import { Photo } from "../models/Bottle";

const { Camera } = Plugins;

const ImagePicker: React.FC<{
  onImagePick: (photo: Photo) => void;
}> = (props) => {
  const [takenPhoto, setTakenPhoto] = useState<Photo>();

  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files![0];
    const fr = new FileReader();
    fr.onload = () => {
      const photo: Photo = {
        path: undefined,
        preview: fr.result!.toString(),
      };
      setTakenPhoto(photo);
      props.onImagePick(photo);
    };
    fr.readAsDataURL(file);
  };

  const handleTakePhoto = async () => {
    if (!Capacitor.isPluginAvailable("Camera")) {
      openFilePicker();
      return;
    }
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        quality: 80,
        width: 500,
      });
      console.log(photo);
      if (!photo || !photo.webPath) {
        return;
      }
      const pickedPhoto: Photo = { path: photo.path, preview: photo.webPath };
      setTakenPhoto(pickedPhoto);
      props.onImagePick(pickedPhoto);
    } catch (error) {
      openFilePicker();
    }
  };

  const openFilePicker = () => {
    filePickerRef.current!.click();
  };

  return (
    <React.Fragment>
      <div className='image-preview'>
        {!takenPhoto && (
          <IonIcon icon={imageOutline} size='large' slot='center' />
        )}
        {takenPhoto && <img src={takenPhoto.preview} alt='' />}
      </div>
      <IonButton fill='clear' onClick={handleTakePhoto}>
        <IonIcon icon={camera} slot='start' />
        <IonLabel>Take Photo</IonLabel>
      </IonButton>
      <input
        type='file'
        hidden
        ref={filePickerRef}
        onChange={pickFileHandler}
      />
    </React.Fragment>
  );
};

export default ImagePicker;

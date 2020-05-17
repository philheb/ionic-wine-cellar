import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const Favorites: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Favorite Bottles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Favorites</h2>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;

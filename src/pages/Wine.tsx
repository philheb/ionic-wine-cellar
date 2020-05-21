import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonIcon,
  IonText,
  IonButtons,
  IonButton,
  IonToast,
  IonAlert,
} from "@ionic/react";

import WineContext from "../data/wine-context";

import "./Wine.css";
import { heart, wine, addOutline } from "ionicons/icons";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";
import WineCard from "../components/WineCard";

const Wine: React.FC = () => {
  const wineCtx = useContext(WineContext);
  const bottles = wineCtx.bottles;
  const favBottles = bottles.filter((bottle) => bottle.favorite === true);
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [startDeleting, setStartDeleting] = useState(false);
  const [selectedWine, setSelectedWine] = useState("");

  const startDeletingHandler = (wineId: string) => {
    setSelectedWine(wineId);
    setStartDeleting(true);
  };

  const deleteBottleHandler = () => {
    setStartDeleting(false);
    wineCtx.removeBottle(selectedWine);
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton onClick={() => history.push("/favorites")}>
              <IonIcon slot='icon-only' icon={heart} />
            </IonButton>
          </IonButtons>
          <IonTitle>My Wine Cellar</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => history.push("/new-wine")}>
              <IonIcon slot='icon-only' icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <h2 className='ion-padding'>
            Your Favorites <IonIcon icon={heart} color='danger' size='small' />
          </h2>
        </IonText>
        {/*  */}
        {favBottles && favBottles.length > 0 ? (
          <Slide bottles={favBottles} />
        ) : (
          <IonText color='medium'>
            <h4 className='ion-margin'>You have no favorite bottles.</h4>
          </IonText>
        )}

        {/*  */}
        <IonText>
          <h2 className='ion-padding'>
            Your List <IonIcon icon={wine} color='dark' size='small' />
          </h2>
        </IonText>

        {bottles.length < 1 && (
          <IonText color='medium'>
            <h4 className='ion-margin'>
              You don't have any bottles yet.{" "}
              <Link to='/new-wine'>Click here</Link> to start your collection.
            </h4>
          </IonText>
        )}
        {bottles.map((bottle) => (
          <WineCard
            key={bottle.id}
            bottle={bottle}
            removeBottle={startDeletingHandler}
          />
        ))}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message='Bottle successfully deleted'
          duration={3000}
          color='danger'
        />
        <IonAlert
          isOpen={startDeleting}
          header={"Are you sure"}
          message={"Do you really want to delete this bottle?"}
          buttons={[
            {
              text: "No",
              role: "cancel",
              handler: () => {
                setStartDeleting(false);
              },
            },
            {
              text: "Yes",
              handler: deleteBottleHandler,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Wine;

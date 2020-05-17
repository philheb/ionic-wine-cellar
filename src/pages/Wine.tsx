import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSlides,
  IonSlide,
  IonText,
} from "@ionic/react";

import WineContext from "../data/wine-context";

import "./Wine.css";
import { heart, heartOutline, wine, trashOutline } from "ionicons/icons";

const Wine: React.FC = () => {
  const wineCtx = useContext(WineContext);
  const bottles = wineCtx.bottles;

  const loadFavorite = () => {};

  const removeBottleHandler = (id: string) => {
    wineCtx.removeBottle(id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Wine Cellar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <h2 className='ion-padding'>
            Your Favorites <IonIcon icon={heart} color='danger' size='small' />
          </h2>
        </IonText>
        {/*  */}

        {/*  */}
        <IonText>
          <h2 className='ion-padding'>
            Your List <IonIcon icon={wine} color='dark' size='small' />
          </h2>
        </IonText>

        {bottles.map((bottle) => {
          const date = new Date(bottle.addedOn).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          });
          return (
            <IonCard button className='wine-card' key={bottle.id}>
              <img src={bottle.base64Url} alt='Wine bottle' />
              <IonFab vertical='top' horizontal='end'>
                <IonFabButton size='small' color='transparent'>
                  <IonIcon
                    icon={trashOutline}
                    color='primary'
                    onClick={() => removeBottleHandler(bottle.id)}
                  />
                </IonFabButton>
              </IonFab>
              <IonFab vertical='top' horizontal='start'>
                <IonFabButton size='small' color='transparent'>
                  <IonIcon icon={heartOutline} color='danger' />
                </IonFabButton>
              </IonFab>
              <IonCardHeader>
                <IonCardSubtitle mode='ios'>{bottle.type}</IonCardSubtitle>
                <IonCardTitle>{bottle.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonRow>
                  <IonCol className='ion-padding-bottom'>
                    Had this wine at mom's place. It was so good with the
                    lobiani!
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className='ion-text-left'>
                    ${bottle.price.toFixed(2)}
                  </IonCol>
                  <IonCol className='ion-text-right'>{date}</IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Wine;

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonButtons,
  IonButton,
  isPlatform,
} from "@ionic/react";
import { heart, wine, add } from "ionicons/icons";

import WineContext from "../data/wine-context";

const Favorites: React.FC = () => {
  const wineCtx = useContext(WineContext);
  const bottles = wineCtx.bottles.filter((bottle) => bottle.favorite);
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={isPlatform("android") ? "primary" : ""}>
          <IonButtons slot='start'>
            <IonButton onClick={() => history.push("/wine-list")}>
              <IonIcon slot='icon-only' icon={wine} />
            </IonButton>
          </IonButtons>
          <IonTitle>My Wine Cave</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => history.push("/new-wine")}>
              <IonIcon slot='icon-only' icon={add} />
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
        {bottles.length < 1 && (
          <IonText color='medium'>
            <h4 className='ion-padding'>You have no favorite bottles.</h4>
          </IonText>
        )}
        {bottles.map((bottle) => {
          const date = new Date(bottle.addedOn).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          });
          return (
            <IonCard button className='wine-card' key={bottle.id}>
              <img src={bottle.base64Url} alt='Wine bottle' />

              {/* <IonFab vertical='top' horizontal='end'>
                <IonFabButton
                  size='small'
                  color='transparent'
                  onClick={() => wineCtx.removeBottle(bottle.id)}
                >
                  <IonIcon icon={trashOutline} color='primary' />
                </IonFabButton>
              </IonFab>

              <IonFab vertical='top' horizontal='start'>
                <IonFabButton
                  size='small'
                  color='transparent'
                  onClick={() => wineCtx.toggleFav(bottle.id)}
                >
                  {bottle.favorite ? (
                    <IonIcon icon={heart} color='danger' />
                  ) : (
                    <IonIcon icon={heartOutline} color='danger' />
                  )}
                </IonFabButton>
              </IonFab> */}

              <IonCardHeader>
                <IonCardSubtitle mode='ios'>{bottle.type}</IonCardSubtitle>
                <IonCardTitle>{bottle.name}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonRow>
                  <IonCol className='ion-padding-bottom'>{bottle.note}</IonCol>
                </IonRow>
                <IonRow>
                  {bottle.price! > 0 ? (
                    <IonCol className='ion-text-left'>
                      ${bottle.price?.toFixed(2)}
                    </IonCol>
                  ) : (
                    <IonCol>Price Unknown</IonCol>
                  )}

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

export default Favorites;

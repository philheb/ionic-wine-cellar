import React, { useContext, useState } from "react";
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
  IonText,
  IonButtons,
  IonButton,
  IonToast,
} from "@ionic/react";

import WineContext from "../data/wine-context";

import "./Wine.css";
import {
  heart,
  heartOutline,
  wine,
  trashOutline,
  addOutline,
} from "ionicons/icons";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";

const Wine: React.FC = () => {
  const wineCtx = useContext(WineContext);
  const bottles = wineCtx.bottles;
  const favBottles = bottles.filter((bottle) => bottle.favorite === true);
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);

  const deleteBottleHandler = (id: string) => {
    wineCtx.removeBottle(id);
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
                <IonFabButton
                  size='small'
                  color='transparent'
                  onClick={() => deleteBottleHandler(bottle.id)}
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
              </IonFab>

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
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message='Bottle successfully deleted'
          duration={3000}
          color='danger'
        />
      </IonContent>
    </IonPage>
  );
};

export default Wine;

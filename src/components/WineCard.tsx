import React, { useContext } from "react";
import {
  IonCard,
  IonFab,
  IonFabButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
} from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { trashOutline, heartOutline } from "ionicons/icons";
import { heart } from "ionicons/icons";

import WineContext from "../context/wine-context";
import { Bottle } from "../models/Bottle";

const WineCard: React.FC<{
  bottle: any;
  removeBottle: (id: string) => void;
}> = (props) => {
  const { bottle } = props;

  const wineCtx = useContext(WineContext);
  const date = new Date(bottle.addedOn).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <IonCard button className='wine-card' key={bottle.id}>
      <img src={bottle.photoUrl} alt='Wine bottle' />

      <IonFab vertical='top' horizontal='end'>
        <IonFabButton
          size='small'
          color='transparent'
          onClick={() => props.removeBottle(bottle.id)}
        >
          <IonIcon icon={trashOutline} color='secondary' />
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
};

export default WineCard;

import React, { useContext, useState, useEffect } from "react";
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
  IonItem,
  IonRange,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  isPlatform,
} from "@ionic/react";

import WineContext from "../context/wine-context";

import "./Wine.css";
import { heart, wine, addOutline, filter, sadOutline } from "ionicons/icons";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";
import WineCard from "../components/WineCard";
import { Bottle } from "../models/Bottle";

const Wine: React.FC = () => {
  const [bottles, setBottles] = useState<Bottle[]>([]);
  const [favBottles, setFavBottles] = useState<Bottle[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [startDeleting, setStartDeleting] = useState(false);
  const [selectedWine, setSelectedWine] = useState("");
  const [rangeValue, setRangeValue] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 100 });

  const wineCtx = useContext(WineContext);
  const history = useHistory();

  useEffect(() => {
    setBottles(wineCtx.bottles);
    setFavBottles(wineCtx.bottles.filter((bottle) => bottle.favorite === true));
  }, [setBottles, setFavBottles, wineCtx.bottles]);

  const startDeletingHandler = (wineId: string) => {
    setSelectedWine(wineId);
    setStartDeleting(true);
  };

  const deleteBottleHandler = () => {
    setStartDeleting(false);
    wineCtx.removeBottle(selectedWine);
    setShowToast(true);
  };

  const selectWineTypeHandler = (event: CustomEvent) => {
    const type = event.detail.value;
    setSelectedType(type);
  };

  const filterHandler = () => {
    const filteredPrice = wineCtx.bottles.filter(
      (bottle) =>
        bottle!.price! >= rangeValue.lower &&
        bottle!.price! <=
          (rangeValue.upper >= 100 ? 100000000 : rangeValue.upper)
    );
    if (selectedType) {
      const filteredPriceAndType = filteredPrice.filter((bottle) => {
        return bottle.type === selectedType;
      });
      setBottles(filteredPriceAndType);
    } else {
      setBottles(filteredPrice);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={isPlatform("android") ? "primary" : ""}>
          <IonButtons slot='start'>
            <IonButton onClick={() => history.push("/favorites")}>
              <IonIcon slot='icon-only' icon={heart} />
            </IonButton>
          </IonButtons>
          <IonTitle>My Wine Cave</IonTitle>
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

        <IonList>
          <IonItem lines='full'>
            <IonLabel>Price</IonLabel>
            <IonRange
              color='secondary'
              dualKnobs={true}
              min={0}
              max={100}
              value={{ lower: rangeValue.lower, upper: rangeValue.upper }}
              step={10}
              snaps={true}
              onIonChange={(e) => setRangeValue(e.detail.value as any)}
            >
              {" "}
              <IonLabel slot='start'>${rangeValue.lower}</IonLabel>
              <IonLabel slot='end'>
                ${rangeValue.upper}
                {rangeValue.upper >= 100 ? "+" : ""}
              </IonLabel>
            </IonRange>
          </IonItem>

          <IonItem lines='full'>
            <IonLabel>Type</IonLabel>
            <IonSelect onIonChange={selectWineTypeHandler}>
              <IonSelectOption value=''>All</IonSelectOption>
              <IonSelectOption value='red'>Red</IonSelectOption>
              <IonSelectOption value='white'>White</IonSelectOption>
              <IonSelectOption value='rosé'>Rosé</IonSelectOption>
              <IonSelectOption value='sparkling'>Sparkling</IonSelectOption>
              <IonSelectOption value='natural'>Natural</IonSelectOption>
              <IonSelectOption value='other'>Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton
            color='primary'
            expand='block'
            className='ion-margin'
            onClick={filterHandler}
          >
            <IonIcon slot='start' icon={filter} />
            Filter
          </IonButton>
        </IonList>
        {wineCtx.bottles.length < 1 && (
          <IonText color='medium'>
            <h4 className='ion-margin'>
              You don't have any bottles yet.{" "}
              <Link to='/new-wine'>Click here</Link> to start your collection.
            </h4>
          </IonText>
        )}
        {wineCtx.bottles.length > 0 && bottles.length < 1 && (
          <IonText color='medium'>
            <h4 className='ion-margin'>
              No bottles found with these filters{" "}
              <IonIcon icon={sadOutline}></IonIcon>
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

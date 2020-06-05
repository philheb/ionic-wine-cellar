import React, { useEffect, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { add, wineOutline, heartOutline } from "ionicons/icons";

import Wine from "./pages/Wine";
import NewWine from "./pages/NewWine";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";

import WineContext from "./context/wine-context";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";

const App: React.FC = () => {
  const wineCtx = useContext(WineContext);

  const { initContext } = wineCtx;
  useEffect(() => {
    initContext();
  }, [initContext]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path='/login' component={Login} exact={true} />
            <Route path='/register' component={Register} exact={true} />
            <Route path='/wine-list' component={Wine} exact={true} />
            <Route path='/new-wine' component={NewWine} exact={true} />
            <Route path='/favorites' component={Favorites} exact={true} />
            <Route
              path='/'
              render={() => <Redirect to='/wine-list' />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='tab1' href='/wine-list'>
              <IonIcon icon={wineOutline} />
              <IonLabel>List</IonLabel>
            </IonTabButton>
            <IonTabButton tab='tab2' href='/new-wine'>
              <IonIcon icon={add} />
              <IonLabel>Add</IonLabel>
            </IonTabButton>
            <IonTabButton tab='tab3' href='/favorites'>
              <IonIcon icon={heartOutline} />
              <IonLabel>Favorites</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

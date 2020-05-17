import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import * as serviceWorker from "./serviceWorker";

import WineContextProvider from "./data/WineContextProvider";

ReactDOM.render(
  <WineContextProvider>
    <App />
  </WineContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

defineCustomElements(window);

serviceWorker.unregister();

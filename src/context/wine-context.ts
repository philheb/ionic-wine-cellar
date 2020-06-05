import React from "react";
import { Bottle, NewBottle } from "../models/Bottle";

const WineContext = React.createContext<{
  bottles: Bottle[];
  addBottle: (bottle: NewBottle) => void;
  removeBottle: (id: string) => void;
  toggleFav: (id: string) => void;
  initContext: () => void;
}>({
  bottles: [],
  addBottle: () => {},
  removeBottle: () => {},
  toggleFav: () => {},
  initContext: () => {},
});

export default WineContext;

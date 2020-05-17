import React, { useState, useEffect, useCallback } from "react";
import { Plugins, FilesystemDirectory } from "@capacitor/core";
import { base64FromPath } from "@ionic/react-hooks/filesystem";

import WineContext from "./wine-context";
import { Bottle, NewBottle } from "../models/Bottle";

const { Storage, Filesystem } = Plugins;

const WineContextProvider: React.FC = (props) => {
  const [bottles, setBottles] = useState<Bottle[]>([]);

  useEffect(() => {
    const storableBottles = bottles.map((bottle) => {
      return {
        id: bottle.id,
        name: bottle.name,
        imagePath: bottle.imagePath,
        type: bottle.type,
        favorite: bottle.favorite,
        price: bottle.price,
        addedOn: bottle.addedOn,
      };
    });
    Storage.set({ key: "bottles", value: JSON.stringify(storableBottles) });
  }, [bottles]);

  const addBottle = async (bottle: NewBottle) => {
    const fileName = new Date().getTime() + ".jpeg";
    const base64 = await base64FromPath(bottle.photo.preview);
    Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: FilesystemDirectory.Data,
    });

    const newBottle: Bottle = {
      id: (Date.now() * 8).toString(),
      name: bottle.name,
      type: bottle.type,
      price: bottle.price,
      imagePath: fileName,
      base64Url: base64,
      favorite: false,
      addedOn: new Date().toString(),
    };
    setBottles((curBottles) => {
      return [...curBottles, newBottle];
    });
  };

  const removeBottle = (id: string) => {
    setBottles((curBottles) => {
      const updatedBottles = curBottles.filter((bottle) => bottle.id !== id);
      return updatedBottles;
    });
    // Storage.set({ key: "bottles", value: JSON.stringify(filteredBottles) });
  };

  const initContext = useCallback(async () => {
    const bottlesData = await Storage.get({ key: "bottles" });
    const storedBottles = bottlesData.value
      ? JSON.parse(bottlesData.value)
      : [];
    const loadedBottles: Bottle[] = [];
    for (const storedBottle of storedBottles) {
      const file = await Filesystem.readFile({
        path: storedBottle.imagePath,
        directory: FilesystemDirectory.Data,
      });
      loadedBottles.push({
        id: storedBottle.id.toString(),
        name: storedBottle.name,
        type: storedBottle.type,
        imagePath: storedBottle.imagePath,
        base64Url: "data:image/jpeg;base64," + file.data,
        price: storedBottle.price,
        favorite: storedBottle.favorite,
        addedOn: storedBottle.addedOn,
      });
    }
    setBottles(loadedBottles);
  }, []);

  return (
    <WineContext.Provider
      value={{
        bottles,
        addBottle,
        removeBottle,
        initContext,
      }}
    >
      {props.children}
    </WineContext.Provider>
  );
};

export default WineContextProvider;

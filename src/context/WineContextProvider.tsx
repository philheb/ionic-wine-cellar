import React, { useState, useEffect, useCallback, useContext } from "react";
import { Plugins, FilesystemDirectory } from "@capacitor/core";

import WineContext from "./wine-context";
import { Bottle, NewBottle } from "../models/Bottle";
import { AuthContext } from "./AuthContextProvider";
import firebase from "../firebaseConfig";

const { Storage, Filesystem } = Plugins;

const WineContextProvider: React.FC = (props) => {
  const authCtx = useContext(AuthContext);
  const [bottles, setBottles] = useState<any[]>([]);
  const db = firebase.firestore();

  const initContext = async () => {
    const user = authCtx.user;
    let loadedBottles: any[] = [];
    if (user) {
      await db
        .collection("Bottles")
        .where("user", "==", `${user.uid}`)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            const bottle = { id, ...data };
            loadedBottles.push(bottle);
          });
        });
      setBottles(loadedBottles);
    }
  };

  const addBottle = async (bottle: NewBottle) => {
    const newBottle = {
      name: bottle.name,
      type: bottle.type,
      price: bottle.price,
      photoUrl: bottle.photoUrl,
      favorite: false,
      addedOn: new Date().toString(),
      note: bottle.note,
      user: authCtx!.user!.uid,
    };

    db.collection("Bottles").add(newBottle);
  };

  const removeBottle = (id: string) => {
    console.log("Bottle removed: ", id);
  };

  const toggleFav = (id: string) => {
    console.log("Toggle favorite bottle id: ", id);
  };

  return (
    <WineContext.Provider
      value={{
        bottles,
        addBottle,
        removeBottle,
        toggleFav,
        initContext,
      }}
    >
      {props.children}
    </WineContext.Provider>
  );
};

export default WineContextProvider;

// useEffect(() => {
//   const storableBottles = bottles.map((bottle) => {
//     return {
//       id: bottle.id,
//       name: bottle.name,
//       imagePath: bottle.imagePath,
//       type: bottle.type,
//       favorite: bottle.favorite,
//       price: bottle.price,
//       addedOn: bottle.addedOn,
//       note: bottle.note,
//     };
//   });
//   Storage.set({ key: "bottles", value: JSON.stringify(storableBottles) });
// }, [bottles]);

// const addBottle = async (bottle: NewBottle) => {
//   const fileName = new Date().getTime() + ".jpeg";
//   const base64 = await base64FromPath(bottle.photo.preview);
//   Filesystem.writeFile({
//     path: fileName,
//     data: base64,
//     directory: FilesystemDirectory.Data,
//   });

//   const newBottle: Bottle = {
//     id: (Date.now() * 8).toString(),
//     name: bottle.name,
//     type: bottle.type,
//     price: bottle.price,
//     imagePath: fileName,
//     base64Url: base64,
//     favorite: false,
//     addedOn: new Date().toString(),
//     note: bottle.note,
//   };
//   setBottles((curBottles) => {
//     return [...curBottles, newBottle];
//   });
// };

// const removeBottle = (id: string) => {
//   setBottles((curBottles) => {
//     const updatedBottles = curBottles.filter((bottle) => bottle.id !== id);
//     return updatedBottles;
//   });
// };

// const toggleFav = (id: string) => {
//   setBottles((curBottles) => {
//     const updatedBottles = [...curBottles];
//     const updatedBottleIndex = updatedBottles.findIndex(
//       (bottle) => bottle.id === id
//     );
//     updatedBottles[updatedBottleIndex].favorite = !updatedBottles[
//       updatedBottleIndex
//     ].favorite;
//     return updatedBottles;
//   });
// };

// const initContext = useCallback(async () => {
//   const bottlesData = await Storage.get({ key: "bottles" });
//   const storedBottles = bottlesData.value
//     ? JSON.parse(bottlesData.value)
//     : [];
//   const loadedBottles: Bottle[] = [];
//   for (const storedBottle of storedBottles) {
//     const file = await Filesystem.readFile({
//       path: storedBottle.imagePath,
//       directory: FilesystemDirectory.Data,
//     });
//     loadedBottles.push({
//       id: storedBottle.id.toString(),
//       name: storedBottle.name,
//       type: storedBottle.type,
//       imagePath: storedBottle.imagePath,
//       base64Url: "data:image/jpeg;base64," + file.data,
//       price: storedBottle.price,
//       favorite: storedBottle.favorite,
//       addedOn: storedBottle.addedOn,
//       note: storedBottle.note,
//     });
//   }
//   setBottles(loadedBottles);
// }, []);

// return (
//   <WineContext.Provider
//     value={{
//       bottles,
//       addBottle,
//       removeBottle,
//       toggleFav,
//       initContext,
//     }}
//   >
//     {props.children}
//   </WineContext.Provider>
// )

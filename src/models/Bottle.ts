export interface Bottle {
  id: string;
  name: string;
  type: WineType;
  price: number;
  favorite: boolean;
  imagePath: string;
  base64Url: string;
  addedOn: string;
}

export interface NewBottle {
  name: string;
  type: WineType;
  price: number;
  photo: Photo;
}

export interface Photo {
  path: string | undefined;
  preview: string;
}

export type WineType =
  | "white"
  | "red"
  | "rosé"
  | "sparkling"
  | "natural"
  | "other";

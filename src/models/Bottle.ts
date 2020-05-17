export interface Bottle {
  id: string;
  name: string;
  type: WineType;
  price: number | undefined | null;
  favorite: boolean;
  imagePath: string;
  base64Url: string;
  addedOn: string;
  note: string | undefined | null;
}

export interface NewBottle {
  name: string;
  type: WineType;
  price: number;
  photo: Photo;
  note: string | undefined | null;
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

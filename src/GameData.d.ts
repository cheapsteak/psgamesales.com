import { GameMediaList } from './types';

export interface GameDataPrice {
  original: {
    cents: number;
    display: string;
  };
  plus: {
    cents: number;
    display: string;
    discountPercentage: number;
  };
  nonPlus: {
    cents: number;
    display: string;
    discountPercentage: number;
  };
}
export interface GameData {
  id: string;
  name: string;
  platforms: (string | number)[];
  price: GameDataPrice;
  thumbnailBase: string;
  mediaList: GameMediaList;
}

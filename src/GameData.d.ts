import { GameMediaList } from './apiResponseTypes';

export interface GameData {
  id: string;
  name: string;
  platforms: (string | number)[];
  price: {
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
  };
  thumbnailBase: string;
  mediaList: GameMediaList;
}

import { GameMediaList } from './apiResponseTypes';

export interface GameDataPrice {
  type?: string;
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
  contentType:
    | 'Dynamic Theme'
    | 'Theme'
    | 'Avatar'
    | 'Bundle'
    | ''
    | 'PSN Game'
    | 'PS VR Game'
    | 'Full Game'
    | 'Season Pass'
    | 'Add-On'
    | 'Level'
    | 'Map'
    | 'Character'
    | 'Avatars'
    | 'Static Theme'
    | string
    | undefined;
  originalFields: {
    type: 'legacy-sku' | 'game-related' | 'game';
  };
}

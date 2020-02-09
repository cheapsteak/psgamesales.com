import { StorefrontItem } from '../types/StoreMetaData';

export interface RegionStorefronts {
  GAMES_NAV: string;
  DEALS_SUB_NAV?: string | RegExp;

  ALL_DEALS: StorefrontItem;
  PSPLUS_FREE_GAMES: StorefrontItem;
  PSPLUS_DISCOUNTS: StorefrontItem;
  PSPLUS_EXCLUSIVES: StorefrontItem;
}

export const AMERICAN_STOREFRONTS: RegionStorefronts = {
  GAMES_NAV: 'STORE-MSF77008-GAMESHOMEPAGE',
  DEALS_SUB_NAV: /STORE-MSF77008-(SAVE|WEEKLYDEALS)/,

  ALL_DEALS: {
    id: 'STORE-MSF77008-ALLDEALS',
    name: 'All Deals',
  },

  PSPLUS_FREE_GAMES: {
    id: 'STORE-MSF77008-PSPLUSFREEGAMES',
    name: 'PS+ Monthly Games',
  },

  PSPLUS_DISCOUNTS: {
    id: 'STORE-MSF77008-PSPLUSDISCOUNTS',
    name: 'PS+ Discounts',
  },

  PSPLUS_EXCLUSIVES: {
    id: 'STORE-MSF77008-PSPLUSEXCLUSIVES',
    name: 'PS+ Exclusives',
  },
};

export const EUROPEAN_STOREFRONTS: RegionStorefronts = {
  GAMES_NAV: 'STORE-MSF75508-GAMESCENE',
  DEALS_SUB_NAV: 'STORE-MSF75508-GAMESPECIALOFF',

  ALL_DEALS: {
    id: 'STORE-MSF75508-PRICEDROPSCHI',
    name: 'Price Drops',
  },

  PSPLUS_FREE_GAMES: {
    id: 'STORE-MSF75508-PLUSINSTANTGAME',
    name: 'PS+ Monthly Games',
  },

  PSPLUS_DISCOUNTS: {
    id: 'STORE-MSF75508-PLUSSCENE',
    name: 'PS+ Discounts',
  },

  PSPLUS_EXCLUSIVES: {
    id: 'STORE-MSF75508-PLUSEXCLUSIVES',
    name: 'PS+ Exclusives',
  },
};

export const ASIAN_STOREFRONTS: RegionStorefronts = {
  GAMES_NAV: 'STORE-MSF86012-GAMEHOMEPAGE',

  ALL_DEALS: {
    id: 'STORE-MSF86012-SPECIALOFFER',
    name: 'Special Offers',
  },

  PSPLUS_FREE_GAMES: {
    id: 'STORE-MSF86012-PLUS_FTT_CONTENT',
    name: 'PS+ Free Games',
  },

  PSPLUS_DISCOUNTS: {
    id: 'STORE-MSF86012-PLUS_DIS_CONTENT',
    name: 'PS+ Discounts',
  },

  PSPLUS_EXCLUSIVES: {
    id: 'STORE-MSF86012-PLUS_EXCLUS_CONT',
    name: 'PS+ Exclusives',
  },
};

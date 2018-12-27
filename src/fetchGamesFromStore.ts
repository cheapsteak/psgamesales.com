import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import localforage from 'localforage';
import {
  ValkyrieStoreIncludedItem,
  ValkyrieStoreResponse,
  GameMediaList,
} from './apiResponseTypes';
import { GameData } from './GameData';

const size = 100;

const fetchFromStore = ({ store, start, language, country }) =>
  axios(
    `https://store.playstation.com/valkyrie-api/${language}/${country.toUpperCase()}/19/container/${store}?bucket=games&size=${size}&start=${start}`,
  );

const checkIfStoreStillExists = ({ store, language, country }) =>
  axios(
    `https://store.playstation.com/valkyrie-api/${language}/${country.toUpperCase()}/19/container/${store}?size=0`,
  ).then(response => response.data.data.attributes['total-results'] > 0);

const getAllItemsFromStore = async ({
  store,
  language,
  country,
}: {
  store: string;
  language: string;
  country: string;
}): Promise<ValkyrieStoreIncludedItem[]> => {
  const response: AxiosResponse<ValkyrieStoreResponse> = await fetchFromStore({
    start: 0,
    store,
    language,
    country,
  });
  const items = response.data.included;
  const totalItems = response.data.data.attributes['total-results'];
  if (totalItems > size) {
    const pagesRemaining = Math.ceil((totalItems - size) / size);
    return _.flatten(
      await Promise.all(
        _.range(pagesRemaining).map(x =>
          fetchFromStore({
            store,
            start: (x + 1) * size,
            language,
            country,
          }).then(response => response.data.included),
        ),
      ),
    );
  } else {
    return items;
  }
};

const transformValkyrieItemToGameData = (
  valkyrieItems: ValkyrieStoreIncludedItem[],
): GameData[] => {
  return valkyrieItems
    .filter(
      item =>
        !!item.attributes['primary-classification'] &&
        item.attributes.skus !== undefined,
    )
    .map(item => {
      const skuWithDiscount = item.attributes.skus!.find(
        sku =>
          sku.prices['non-plus-user']['discount-percentage'] > 0 ||
          sku.prices['plus-user']['discount-percentage'] > 0,
      );
      const plusUserPricing = skuWithDiscount!.prices['plus-user'];
      const nonPlusUserPricing = skuWithDiscount!.prices['non-plus-user'];
      return {
        // _originalData: item,
        id: item.id,
        name: item.attributes.name,
        platforms: item.attributes.platforms,
        starRating: item.attributes['star-rating'],
        price: {
          original: {
            display: nonPlusUserPricing['strikethrough-price'].display,
            cents: nonPlusUserPricing['strikethrough-price'].value,
          },
          nonPlus: {
            cents: nonPlusUserPricing['actual-price'].value,
            display: nonPlusUserPricing['actual-price'].display,
            discountPercentage: nonPlusUserPricing['discount-percentage'],
          },
          plus: {
            cents: plusUserPricing['strikethrough-price'].value,
            display: plusUserPricing['strikethrough-price'].display,
            discountPercentage: plusUserPricing['discount-percentage'],
          },
        },
        thumbnailBase: item.attributes['thumbnail-url-base'] as string,
        mediaList: item.attributes['media-list'] as GameMediaList,
      };
    });
};

try {
  localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'ps-store',
    version: 1.0,
  });
} catch (e) {
  // no indexeddb
}

const fetchGamesFromStore = async ({ store, country, language }) => {
  const fetchGamesFromStoreFromNetwork = () =>
    getAllItemsFromStore({ store, country, language }).then(items =>
      transformValkyrieItemToGameData(items),
    );

  try {
    const storedStoreItems = await localforage.getItem(store);

    if (
      storedStoreItems &&
      checkIfStoreStillExists({ store, country, language })
    ) {
      return storedStoreItems as GameData[];
    } else {
      const items = fetchGamesFromStoreFromNetwork();
      await localforage.removeItem(store);
      return items;
    }
  } catch (e) {
    // browser doesn't support indexeddb
    return fetchGamesFromStoreFromNetwork();
  }
};

export default fetchGamesFromStore;

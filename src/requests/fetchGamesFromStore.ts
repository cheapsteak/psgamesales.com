import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import {
  ValkyrieStoreIncludedItem,
  ValkyrieStoreResponse,
  GameMediaList,
  Platform,
  GameType,
} from 'src/types';
import { GameData } from 'src/GameData';
import { localforageInstance } from 'src/localforageInstance';

const size = 100;

const fetchFromStore = ({
  store,
  start,
  language,
  country,
  platforms,
  gameTypes,
}) =>
  axios(
    `https://store.playstation.com/valkyrie-api/${language}/${country.toUpperCase()}/19/container/${store}?${querystring.stringify(
      _.omitBy(
        {
          bucket: 'games',
          size: size,
          start: start,
          platform: platforms.join(','),
          game_type: gameTypes.join(','),
        },
        value => !_.isNil(value),
      ),
    )}`,
  );

const checkIfStoreStillExists = ({ store, language, country }) =>
  axios(
    `https://store.playstation.com/valkyrie-api/${language}/${country.toUpperCase()}/19/container/${store}?size=0`,
  ).then(response => response.data.data.attributes['total-results'] > 0);

const getAllItemsFromStore = async ({
  store,
  language,
  country,
  platforms,
  gameTypes,
  onFirstPageLoad,
}: {
  store: string;
  language: string;
  country: string;
  platforms: Platform[];
  gameTypes: GameType[];
  onFirstPageLoad?: (firstPageResponse: ValkyrieStoreIncludedItem[]) => void;
}): Promise<ValkyrieStoreIncludedItem[]> => {
  // fetch one page first
  const response: AxiosResponse<ValkyrieStoreResponse> = await fetchFromStore({
    start: 0,
    store,
    language,
    country,
    platforms,
    gameTypes,
  });
  const items = response.data.included;
  const totalItems = response.data.data.attributes['total-results'];

  if (totalItems > size) {
    onFirstPageLoad && onFirstPageLoad(response.data.included);
    const pagesRemaining = Math.ceil((totalItems - size) / size);
    // fetch all the other pages at once
    return [
      ...items,
      ..._.flatten(
        await Promise.all(
          _.range(pagesRemaining).map(x =>
            fetchFromStore({
              store,
              start: (x + 1) * size,
              language,
              country,
              platforms,
              gameTypes,
            }).then(response => response.data.included),
          ),
        ),
      ),
    ];
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
            cents: plusUserPricing['actual-price'].value,
            display: plusUserPricing['actual-price'].display,
            discountPercentage: plusUserPricing['discount-percentage'],
          },
        },
        thumbnailBase: item.attributes['thumbnail-url-base'] as string,
        mediaList: item.attributes['media-list'] as GameMediaList,
      };
    });
};

const fetchGamesFromStore = async ({
  store,
  country,
  language,
  platforms,
  gameTypes,

  // callback used to partially populate the list when only the first page of data has been returned
  onPartialResponse,
}) => {
  const storeParams = { store, country, language, platforms, gameTypes };
  const storeKey = JSON.stringify({
    store,
    country,
    language,
    platforms: platforms.slice().sort(),
    gameTypes: gameTypes.slice().sort(),
  });
  let storeItems;

  try {
    storeItems = await localforageInstance.getItem(storeKey);

    if (storeItems) {
      try {
        await checkIfStoreStillExists({ store, country, language });
      } catch (e) {
        await localforageInstance.removeItem(store);
        throw e;
      }
      return transformValkyrieItemToGameData(storeItems);
    }

    storeItems = getAllItemsFromStore(storeParams);
    localforageInstance.setItem(storeKey, storeItems);
    return transformValkyrieItemToGameData(storeItems);
  } catch (e) {
    // browser doesn't support indexeddb
    return getAllItemsFromStore({
      ...storeParams,
      onFirstPageLoad: partialResponse =>
        onPartialResponse(transformValkyrieItemToGameData(partialResponse)),
    }).then(transformValkyrieItemToGameData);
  }
};

export default fetchGamesFromStore;

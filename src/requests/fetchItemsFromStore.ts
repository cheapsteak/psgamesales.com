import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import {
  ValkyrieStoreIncludedItem,
  ValkyrieStoreResponse,
  Platform,
  GameType,
  ContentType,
} from 'src/types';
import { localforageInstance } from 'src/localforageInstance';

// const firstPageSize = 50;
// const subsequentPageSize = 100;
const pageSize = 40;

interface Facets {
  platforms?: Platform[];
  gameTypes?: GameType[];
  contentTypes?: ContentType[];
}
interface StoreOptions {
  store: string;

  // TODO: possible to generate types for these from constants/countries.ts?
  // maybe reference https://github.com/Microsoft/TypeScript/issues/28046#issuecomment-431871542
  // https://github.com/Microsoft/TypeScript/issues/10195
  country: string;
  language: string;
}

const fetchFromStore = ({
  store,
  size,
  start,
  language,
  country,
  platforms,
  gameTypes,
  contentTypes,
}: Facets &
  StoreOptions & {
    start: number;
    size: number;
  }) =>
  axios(
    `https://store.playstation.com/valkyrie-api/${language}/${country.toUpperCase()}/19/container/${store}?${querystring.stringify(
      _.omitBy(
        {
          bucket: 'games',
          size: size,
          start: start,
          platform: platforms && platforms.join(','),
          game_type: gameTypes && gameTypes.join(','),
          game_content_type: contentTypes && contentTypes.join(','),
        },
        value => _.isNil(value),
      ),
    )}`,
  );

const checkIfStoreStillExists = ({ store, language, country }: StoreOptions) =>
  axios(
    `https://store.playstation.com/valkyrie-api/${language}/${country.toUpperCase()}/19/container/${store}?size=0`,
  ).then(response => response.data.data.attributes['total-results'] > 0);

const getAllItemsFromStore = async ({
  store,
  language,
  country,
  platforms,
  gameTypes,
  contentTypes,
  onPageLoad,
}: Facets &
  StoreOptions & {
    onPageLoad?: (
      pageResponse: ValkyrieStoreResponse,
      pageIndex: number,
      pageSize: number,
    ) => void;
  }): Promise<ValkyrieStoreResponse> => {
  // fetch one page first
  const response: AxiosResponse<ValkyrieStoreResponse> = await fetchFromStore({
    start: 0,
    size: pageSize,
    store,
    language,
    country,
    platforms,
    gameTypes,
    contentTypes,
  });
  const items = response.data.included;
  const totalItems = response.data.data.attributes['total-results'];

  if (totalItems > pageSize) {
    onPageLoad && onPageLoad(response.data, 0, pageSize);
    const pagesRemaining = Math.ceil((totalItems - pageSize) / pageSize);
    // fetch all the other pages at once
    return {
      data: response.data.data,
      included: [
        ...items,
        ..._.flatten(
          await Promise.all(
            _.range(pagesRemaining).map(x =>
              fetchFromStore({
                store,
                size: pageSize,
                start: (x + 1) * pageSize,
                language,
                country,
                platforms,
                gameTypes,
                contentTypes,
              }).then(response => {
                onPageLoad && onPageLoad(response.data, x + 1, pageSize);
                return response.data.included;
              }),
            ),
          ),
        ),
      ],
    };
  } else {
    return response.data;
  }
};

const fetchItemsFromStore = async ({
  store,
  country,
  language,
  platforms,
  gameTypes,
  contentTypes,

  // callback used to partially populate the list when only the first page of data has been returned
  onPartialResponse,
}: Facets &
  StoreOptions & {
    onPartialResponse: (
      partialResponse: ValkyrieStoreResponse,
      pageIndex: number,
      pageSize: number,
    ) => void;
  }): Promise<ValkyrieStoreResponse> => {
  const storeParams = {
    store,
    country,
    language,
    platforms,
    gameTypes,
    contentTypes,
    onPageLoad: (partialResponse, pageIndex, pageSize) => {
      onPartialResponse(partialResponse, pageIndex, pageSize);
    },
  };
  const storeKey = JSON.stringify({
    store,
    country,
    language,
    platforms: platforms && platforms.slice().sort(),
    gameTypes: gameTypes && gameTypes.slice().sort(),
    contentTypes: contentTypes && contentTypes.slice().sort(),
  });
  let storeData: ValkyrieStoreResponse;

  try {
    storeData = await localforageInstance.getItem(storeKey);

    if (storeData) {
      try {
        await checkIfStoreStillExists({ store, country, language });
      } catch (e) {
        await localforageInstance.removeItem(store);
        throw e;
      }
      onPartialResponse(storeData, 0, storeData.included.length);
    }

    storeData = await getAllItemsFromStore(storeParams);
    localforageInstance.setItem(storeKey, storeData);
    return storeData;
  } catch (e) {
    // browser doesn't support indexeddb
    return await getAllItemsFromStore(storeParams);
  }
};

export default fetchItemsFromStore;

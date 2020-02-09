import querystring from 'querystring';
import React, { useState, useContext, useEffect, useReducer } from 'react';
import _ from 'lodash';

import { ValkyrieStoreIncludedItem, GameData, StoreMetaData } from 'src/types';
import fetchItemsFromStore from 'src/requests/fetchItemsFromStore';
import { UserOptionsContext } from 'src/UserOptionsContext';
import queryParamDict from 'src/queryParamDict';
import { useLocation } from '@reach/router/unstable-hooks';
import transformValkyrieItemToGameData from 'src/requests/transformValkyrieItemToGameData';
import { Redirect } from '@reach/router';

export const StoreContext: React.Context<{
  games: (GameData | null)[];
  gamesToShow: (GameData | null)[];
  storeMetaData: StoreMetaData;
  storeItems: (ValkyrieStoreIncludedItem | null)[];
  isLoading: boolean;
  hasPartialContent: boolean;
}> = React.createContext({
  storeMetaData: {} as StoreMetaData,
  storeItems: [] as (ValkyrieStoreIncludedItem | null)[],
  games: [] as (GameData | null)[],
  gamesToShow: [] as (GameData | null)[],
  isLoading: false as boolean,
  hasPartialContent: false as boolean,
});

type StoreItemsAction_Partial = {
  type: 'partial';
  items: ValkyrieStoreIncludedItem[];
  pageIndex: number;
  pageSize: number;
  totalResultsCount: number;
};

type StoreItemsAction_Whole = {
  type: 'whole';
  items: ValkyrieStoreIncludedItem[];
};

type StoreItemsAction_Error = {
  type: 'error';
  error: any;
};

const useStore = storeName => {
  const { language, country, platforms, contentTypes } = useContext(
    UserOptionsContext,
  );

  const [storeItems, dispatchStoreItemsAction] = useReducer(
    (
      itemsCurrentlyInStore,
      action:
        | StoreItemsAction_Partial
        | StoreItemsAction_Whole
        | StoreItemsAction_Error,
    ) => {
      if (action.type === 'error') {
        return action.error;
      }

      const itemsWithoutFillers = action.items.filter(
        item => item.type !== 'legacy-sku',
      );

      if (action.type === 'partial') {
        const { pageIndex, pageSize, totalResultsCount } = action;

        const itemsWithHoles =
          itemsCurrentlyInStore.length === totalResultsCount
            ? itemsCurrentlyInStore
            : _.fill(_.range(totalResultsCount), null);

        return [
          ...itemsWithHoles.slice(0, pageIndex * pageSize),
          ...itemsWithoutFillers,
          ...itemsWithHoles.slice((pageIndex + 1) * pageSize),
        ];
      } else if (action.type === 'whole') {
        return itemsWithoutFillers;
      } else {
        return itemsCurrentlyInStore;
      }
    },
    [] as (ValkyrieStoreIncludedItem | null)[],
  );
  const [storeMetaData, setStoreMetaData] = useState({} as StoreMetaData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPartialContent, setHasPartialContent] = useState(false);

  window['storeItems'] = storeItems;

  useEffect(
    () => {
      setIsLoading(true);
      if (!country) {
        return;
      }
      fetchItemsFromStore({
        store: storeName,
        language,
        country: country.code,
        platforms,
        contentTypes,
        onPartialResponse: ({ data, included }, pageIndex, pageSize) => {
          const totalResultsCount = data.attributes['total-results'];

          setStoreMetaData({
            id: data.id,
            name: data.attributes.name,
            totalResults: totalResultsCount,
          });

          dispatchStoreItemsAction({
            type: 'partial',
            items: included,
            pageIndex,
            pageSize,
            totalResultsCount,
          });

          setHasPartialContent(true);
        },
      })
        .then(({ data, included }) => {
          setStoreMetaData({
            id: data.id,
            name: data.attributes.name,
            totalResults: data.attributes['total-results'],
          });
          dispatchStoreItemsAction({ type: 'whole', items: included });
          setIsLoading(false);
        })
        .catch(error => {
          dispatchStoreItemsAction({ type: 'error', error });
        });
    },
    [
      country,
      storeName,
      language,
      country,
      platforms.join(','),
      contentTypes.join(','),
    ],
  );

  return {
    isLoading,
    hasPartialContent,
    storeItems,
    storeMetaData,
  };
};

export const StoreContextProvider: React.FunctionComponent<{
  storeName: string;
  children: any;
}> = ({ storeName, children }) => {
  const [location] = useLocation();
  const { storeMetaData, storeItems, isLoading, hasPartialContent } = useStore(
    storeName,
  );

  if (storeItems instanceof Error) {
    return <Redirect to="/" noThrow />;
  }

  const games = transformValkyrieItemToGameData(storeItems);
  window['games'] = games;

  const gameQuery = querystring.parse(location.search.replace(/^\?/, ''))[
    queryParamDict.GAME_SEARCH
  ] as string; // cooercing to `string` because we don't expect the query param to appear multiple times

  const gamesToShow = games.filter(game => {
    if (!game) return true;

    // Note: 'game-related' also contains expansion packs like Destiny: Forsaken
    // if (game.originalFields.type === 'game-related') {
    //   return false;
    // }

    if (gameQuery && gameQuery.length > 0) {
      return game.name.toLowerCase().includes(gameQuery);
    }
    return true;
  });

  return (
    <StoreContext.Provider
      value={{
        storeMetaData,
        storeItems,
        games,
        gamesToShow,
        isLoading,
        hasPartialContent,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

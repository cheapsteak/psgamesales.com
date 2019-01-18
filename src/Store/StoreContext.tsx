import querystring from 'querystring';
import React, { useState, useContext, useEffect } from 'react';

import {
  ValkyrieStoreIncludedItem,
  ValkyrieStoreResponse,
  GameData,
  StoreMetaData,
} from 'src/types';
import fetchItemsFromStore from 'src/requests/fetchItemsFromStore';
import { UserOptionsContext } from 'src/UserOptionsContext';
import queryParamDict from 'src/queryParamDict';
import { useLocation } from '@reach/router/unstable-hooks';
import transformValkyrieItemToGameData from 'src/requests/transformValkyrieItemToGameData';

export const StoreContext: React.Context<{
  games: GameData[];
  gamesMatchingQuery: GameData[];
  storeMetaData: StoreMetaData;
  storeItems: ValkyrieStoreIncludedItem[];
  isLoading: boolean;
  hasPartialContent: boolean;
}> = React.createContext({
  storeMetaData: {} as StoreMetaData,
  storeItems: [] as ValkyrieStoreIncludedItem[],
  games: [] as GameData[],
  gamesMatchingQuery: [] as GameData[],
  isLoading: false,
  hasPartialContent: false,
});

const useStore = storeName => {
  const {
    language,
    country,
    platforms,
    // contentTypes
  } = useContext(UserOptionsContext);
  const [storeItems, setStoreItems] = useState(
    [] as ValkyrieStoreIncludedItem[],
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
        country,
        platforms,
        // contentTypes,
        onPartialResponse: ({ data, included }) => {
          setStoreMetaData({
            id: data.id,
            name: data.attributes.name,
            totalResults: data.attributes['total-results'],
          });
          setStoreItems(included);
          setHasPartialContent(true);
        },
      }).then(({ data, included }) => {
        setStoreMetaData({
          id: data.id,
          name: data.attributes.name,
          totalResults: data.attributes['total-results'],
        });
        setStoreItems(included);
        setIsLoading(false);
      });
    },
    [
      country,
      storeName,
      language,
      country,
      platforms.join(','),
      // contentTypes.join(','),
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

  const games = transformValkyrieItemToGameData(storeItems);
  window['games'] = games;

  const gameQuery = querystring.parse(location.search.replace(/^\?/, ''))[
    queryParamDict.GAME_SEARCH
  ] as string; // cooercing to `string` because we don't expect the query param to appear multiple times

  const gamesMatchingQuery =
    gameQuery && gameQuery.length > 0
      ? games.filter(game => game.name.toLowerCase().includes(gameQuery))
      : games;

  return (
    <StoreContext.Provider
      value={{
        storeMetaData,
        storeItems,
        games,
        gamesMatchingQuery,
        isLoading,
        hasPartialContent,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

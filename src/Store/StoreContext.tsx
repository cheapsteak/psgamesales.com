import querystring from 'querystring';
import React, { useState, useContext, useEffect } from 'react';
import _ from 'lodash';

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
  isLoading: false,
  hasPartialContent: false,
});

// legacy-skus contain duplicate data
const filterResponseItems = includedItem => includedItem.type !== 'legacy-sku';

const useStore = storeName => {
  const {
    language,
    country,
    platforms,
    // contentTypes
  } = useContext(UserOptionsContext);
  const [storeItems, setStoreItems] = useState(
    [] as (ValkyrieStoreIncludedItem | null)[],
  );
  const [storeMetaData, setStoreMetaData] = useState({} as StoreMetaData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPartialContent, setHasPartialContent] = useState(false);

  window['storeItems'] = storeItems;
  let mutableStoreItems = storeItems;

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
        onPartialResponse: ({ data, included }, pageIndex, pageSize) => {
          const totalResultsCount = data.attributes['total-results'];
          const includedWithoutFillers = included.filter(filterResponseItems);

          setStoreMetaData({
            id: data.id,
            name: data.attributes.name,
            totalResults: totalResultsCount,
          });

          const storeItemsWithHoles =
            mutableStoreItems.length === totalResultsCount
              ? mutableStoreItems
              : _.fill(_.range(totalResultsCount), null);

          const updatedStoreItems = [
            ...storeItemsWithHoles.slice(0, pageIndex * pageSize),
            ...includedWithoutFillers,
            ...storeItemsWithHoles.slice((pageIndex + 1) * pageSize),
          ];

          setStoreItems(updatedStoreItems);
          mutableStoreItems = updatedStoreItems;
          setHasPartialContent(true);
        },
      }).then(({ data, included }) => {
        setStoreMetaData({
          id: data.id,
          name: data.attributes.name,
          totalResults: data.attributes['total-results'],
        });
        setStoreItems(included.filter(filterResponseItems));
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

  const gamesToShow = games.filter(game => {
    if (!game) return true;
    if (game.originalFields.type === 'game-related') {
      return false;
    }
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

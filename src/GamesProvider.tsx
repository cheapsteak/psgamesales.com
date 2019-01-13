import React, { useState, useContext, useEffect } from 'react';

import fetchItemsFromStore from './requests/fetchItemsFromStore';
import { UserOptionsContext } from './UserOptionsContext';
import transformValkyrieItemToGameData from './requests/transformValkyrieItemToGameData';

const defaultStore = `STORE-MSF77008-HOLIDAYSALELP`;

const GamesProvider: React.FunctionComponent<{
  children: (props) => any;
}> = props => {
  const { language, country, platforms, contentTypes } = useContext(
    UserOptionsContext,
  );
  const [store, setStore] = useState(defaultStore);
  const [storeItems, setStoreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPartialContent, setHasPartialContent] = useState(false);

  window['storeItems'] = storeItems;

  useEffect(
    () => {
      setIsLoading(true);
      fetchItemsFromStore({
        store,
        language,
        country,
        platforms,
        // gameTypes,
        contentTypes,
        onPartialResponse: partialStoreItems => {
          setStoreItems(partialStoreItems);
          setHasPartialContent(true);
        },
      }).then(returnedStoreItems => {
        setStoreItems(returnedStoreItems);
        setIsLoading(false);
      });
    },
    [language, country, platforms.join(','), contentTypes.join(',')],
  );

  return props.children({
    games: transformValkyrieItemToGameData(storeItems),
    isLoading,
    hasPartialContent,
  });
};

export default GamesProvider;

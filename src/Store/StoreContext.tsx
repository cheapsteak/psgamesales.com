import React, { useState, useContext, useEffect } from 'react';

import { ValkyrieStoreIncludedItem } from 'src/types';
import fetchItemsFromStore from 'src/requests/fetchItemsFromStore';
import { UserOptionsContext } from 'src/UserOptionsContext';

export const StoreContext: React.Context<{
  storeItems: ValkyrieStoreIncludedItem[];
  isLoading: boolean;
  hasPartialContent: boolean;
}> = React.createContext({
  storeItems: [] as ValkyrieStoreIncludedItem[],
  isLoading: false,
  hasPartialContent: false,
});

const useStore = storeName => {
  const { language, country, platforms, contentTypes } = useContext(
    UserOptionsContext,
  );
  const [storeItems, setStoreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPartialContent, setHasPartialContent] = useState(false);

  window['storeItems'] = storeItems;

  useEffect(
    () => {
      setIsLoading(true);
      fetchItemsFromStore({
        store: storeName,
        language,
        country,
        platforms,
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
    [storeName, language, country, platforms.join(','), contentTypes.join(',')],
  );

  return {
    isLoading,
    hasPartialContent,
    storeItems,
  };
};

export const StoreContextProvider: React.FunctionComponent<{
  storeName: string;
  children: any;
}> = ({ storeName, children }) => {
  const { storeItems, isLoading, hasPartialContent } = useStore(storeName);

  return (
    <StoreContext.Provider
      value={{
        storeItems,
        isLoading,
        hasPartialContent,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

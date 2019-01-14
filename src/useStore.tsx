import { useState, useContext, useEffect } from 'react';

import fetchItemsFromStore from './requests/fetchItemsFromStore';
import { UserOptionsContext } from './UserOptionsContext';

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
    storeItems,
    isLoading,
    hasPartialContent,
  };
};

export default useStore;

import { useContext, useState, useEffect } from 'react';
import createContainer from 'constate';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { StorefrontItem } from 'src/types/StoreMetaData';
import fetchStorefronts from 'src/requests/fetchStorefronts';

const useStorefronts = () => {
  const { country } = useContext(UserOptionsContext);
  const [storefronts, setStorefronts] = useState([] as StorefrontItem[]);

  useEffect(
    () => {
      if (!country) {
        return;
      }
      fetchStorefronts(country.code).then(fetchedStorefronts => {
        if (!fetchedStorefronts || !fetchedStorefronts.length) {
          throw new Error('No storefronts could be found');
        }
        setStorefronts(fetchedStorefronts);
      });
    },
    [country && country.key],
  );

  return storefronts;
};

const StorefrontContainer = createContainer(useStorefronts);

export default StorefrontContainer;

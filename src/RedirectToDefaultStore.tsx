import React, { useContext, useState, useEffect } from 'react';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { StorefrontItem } from 'src/types/StoreMetaData';
import fetchStorefronts from 'src/requests/fetchStorefronts';
import { Redirect } from '@reach/router';

const RedirectToDefaultStore: React.FunctionComponent = () => {
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

  if (!country || !storefronts.length) {
    // loading
    return null;
  }

  return <Redirect noThrow to={`stores/${storefronts[0].id}`} />;
};

export default RedirectToDefaultStore;
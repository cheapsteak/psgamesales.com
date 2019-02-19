import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import StorefrontContainer from 'src/StorefrontContainer';

const RedirectToDefaultStore: React.FunctionComponent = () => {
  const [storefronts, isLoading] = useContext(StorefrontContainer.Context);

  if (storefronts.length === 0 || isLoading) {
    // wait a bit for storefronts to return
    return null;
  }

  return <Redirect noThrow to={`stores/${storefronts[0].id}`} />;
};

export default RedirectToDefaultStore;

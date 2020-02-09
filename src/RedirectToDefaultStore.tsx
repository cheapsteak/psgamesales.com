import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import StorefrontContainer from 'src/StorefrontContainer';
import * as routes from "src/routes";

const RedirectToDefaultStore: React.FunctionComponent = () => {
  const [storefronts, isLoading, country] = useContext(StorefrontContainer.Context);

  if (storefronts.length === 0 || isLoading || !country) {
    // wait a bit for storefronts to return
    return null;
  }

  return <Redirect noThrow to={routes.storefront(country.code, country.languageCode, storefronts[0].id)} />;
};

export default RedirectToDefaultStore;

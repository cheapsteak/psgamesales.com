import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import StorefrontContainer from './StorefrontContainer';

const RedirectToDefaultStore: React.FunctionComponent = () => {
  const storefronts = useContext(StorefrontContainer.Context);

  if (!storefronts.length) {
    // loading
    return null;
  }

  return <Redirect noThrow to={`stores/${storefronts[0].id}`} />;
};

export default RedirectToDefaultStore;

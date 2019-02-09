import React from 'react';
import { Redirect } from '@reach/router';
import useStorefronts from './useStorefronts';

const RedirectToDefaultStore: React.FunctionComponent = () => {
  const storefronts = useStorefronts();

  if (!storefronts.length) {
    // loading
    return null;
  }

  return <Redirect noThrow to={`stores/${storefronts[0].id}`} />;
};

export default RedirectToDefaultStore;

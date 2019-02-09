import React from 'react';
import { Redirect } from '@reach/router';
import { DEFAULT_STOREFRONT } from './constants';

const RedirectToDefaultStore: React.FunctionComponent = () => (
  <Redirect noThrow to={`stores/${DEFAULT_STOREFRONT.id}`} />
);

export default RedirectToDefaultStore;

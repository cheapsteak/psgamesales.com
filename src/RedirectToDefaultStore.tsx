import React from 'react';
import { Redirect } from '@reach/router';
import DEFAULT_STOREFRONTS from './constants/DEFAULT_STOREFRONTS';

const RedirectToDefaultStore: React.FunctionComponent = () => (
  <Redirect noThrow to={`stores/${DEFAULT_STOREFRONTS.ALL_DEALS.id}`} />
);

export default RedirectToDefaultStore;

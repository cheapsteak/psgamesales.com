import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import { getRegionStorefrontsByCountryCode } from 'src/utils';
import { UserOptionsContext } from 'src/UserOptionsContext';

const RedirectToDefaultStore: React.FunctionComponent = () => {
  const { country: countryFromUserOptions } = useContext(UserOptionsContext);

  if (!countryFromUserOptions) {
    // wait a bit for country to return;
    return null;
  }

  const regionStorefronts = getRegionStorefrontsByCountryCode(
    countryFromUserOptions.code,
  );

  return <Redirect noThrow to={`stores/${regionStorefronts.ALL_DEALS.id}`} />;
};

export default RedirectToDefaultStore;

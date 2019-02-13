import axios, { AxiosResponse } from 'axios';
import {
  ValkyrieStorefrontBase,
  ValkyrieStorefrontBase__Item,
} from 'src/types/storefrontBaseResponseTypes';
import { StorefrontItem } from 'src/types';
import _ from 'lodash';
import {
  getRegionStorefrontsByCountryCode,
  mapCountryToMsftCode,
  getLanguageByCountryCode,
} from 'src/utils';

const transformValkyrieStorefrontToStorefront = (
  valkyrieStorefront: ValkyrieStorefrontBase__Item,
): StorefrontItem => ({
  id: valkyrieStorefront['target-container-id'],
  name: valkyrieStorefront.name,
});

const fetchStorefronts = async (countryCode: string) => {
  // not sure what the difference is between 999 and 19, but 19 had a 2k sale and 999 didn't
  // const url = `https://store.playstation.com/valkyrie-api/en/${countryCode.toUpperCase()}/999/storefront/STORE-MSF77008-BASE`;
  const msfCode = mapCountryToMsftCode(countryCode);
  const url = `https://store.playstation.com/valkyrie-api/${getLanguageByCountryCode(
    countryCode,
  )}/${countryCode.toUpperCase()}/19/storefront/STORE-${msfCode}-BASE`;

  let storefrontsToReturn: StorefrontItem[] = [];

  const regionStorefronts = getRegionStorefrontsByCountryCode(countryCode);

  const response: AxiosResponse<ValkyrieStorefrontBase> = await axios.get(url);
  try {
    const navigationItem = response.data.data.attributes.navigation.find(
      navigationItem =>
        navigationItem['target-container-id'] === regionStorefronts.GAMES_NAV,
    );
    if (!navigationItem) {
      throw new Error(
        `Unable to find homepage navigation item from list. Country: '${countryCode}'`,
      );
    }
    const saleNavItems = navigationItem.submenu.find(
      submenuItem =>
        submenuItem['target-container-id'] === regionStorefronts.DEALS_SUB_NAV,
    );

    if (!saleNavItems) {
      throw new Error('Unable to find sale items from list');
    }

    const separatorIndex = saleNavItems.items.findIndex(
      item => item['is-separator'],
    );

    storefrontsToReturn = saleNavItems.items
      .filter(
        (item, i) =>
          // bundles aren't really sales
          item['target-container-id'] !== 'STORE-MSF77008-BUNDLESGRID' &&
          i > separatorIndex,
      )
      .map(transformValkyrieStorefrontToStorefront);
  } catch (e) {
    console.error('could not find "deals" in navigation', e);
  }

  return _.uniqBy(
    [
      ...storefrontsToReturn,
      regionStorefronts.PSPLUS_FREE_GAMES,
      regionStorefronts.PSPLUS_DISCOUNTS,
      regionStorefronts.PSPLUS_EXCLUSIVES,
      regionStorefronts.ALL_DEALS,
    ],
    storefront => storefront.id,
  );
};

export default fetchStorefronts;

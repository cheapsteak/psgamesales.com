import axios, { AxiosResponse } from 'axios';
import {
  ValkyrieStorefrontBase,
  ValkyrieStorefrontBase__Item,
} from 'src/types/storefrontBaseResponseTypes';
import { StorefrontItem } from 'src/types';
import { DEFAULT_STOREFRONT } from 'src/constants';

const transformValkyrieStorefrontToStorefront = (
  valkyrieStorefront: ValkyrieStorefrontBase__Item,
): StorefrontItem => ({
  id: valkyrieStorefront['target-container-id'],
  name: valkyrieStorefront.name,
});

const fetchStorefronts = async (countryCode: string) => {
  const url = `https://store.playstation.com/valkyrie-api/en/${countryCode.toUpperCase()}/999/storefront/STORE-MSF77008-BASE`;
  const response: AxiosResponse<ValkyrieStorefrontBase> = await axios.get(url);
  const navigationItem = response.data.data.attributes.navigation.find(
    navigationItem =>
      navigationItem['target-container-id'] === 'STORE-MSF77008-GAMESHOMEPAGE',
  );
  if (!navigationItem) {
    throw new Error('Unable to find homepage navigation item from list');
  }
  const saleNavItems = navigationItem.submenu.find(
    submenuItem => submenuItem['target-container-id'] === 'STORE-MSF77008-SAVE',
  );

  if (!saleNavItems) {
    throw new Error('Unable to find sale items from list');
  }

  const separatorIndex = saleNavItems.items.findIndex(
    item => item['is-separator'],
  );

  return [
    DEFAULT_STOREFRONT,
    ...saleNavItems.items
      .filter(
        (item, i) =>
          // bundles aren't really sales
          item['target-container-id'] !== 'STORE-MSF77008-BUNDLESGRID' &&
          i > separatorIndex,
      )
      .map(transformValkyrieStorefrontToStorefront),
    {
      id: 'STORE-MSF77008-PLAYSTATIONPLUS',
      name: 'PlayStation®Plus',
    },
  ];
};

export default fetchStorefronts;

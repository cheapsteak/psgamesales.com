import axios, { AxiosResponse } from 'axios';
import {
  ValkyrieStorefrontBase,
  ValkyrieStorefrontBase__Item,
} from 'src/types/storefrontBaseResponseTypes';
import { StorefrontItem } from 'src/types';

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
  return (
    saleNavItems.items
      .filter(
        item =>
          !item['is-separator'] &&
          // bundles aren't really sales
          item['target-container-id'] !== 'STORE-MSF77008-BUNDLESGRID',
      )
      .map(transformValkyrieStorefrontToStorefront)
      // Note: this might not be the best way to sort
      // only one datapoint now to infer that normal storefronts are at the top
      .reverse()
  );
};

export default fetchStorefronts;

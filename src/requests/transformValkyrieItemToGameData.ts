import { ValkyrieStoreIncludedItem, GameMediaList, GameData } from 'src/types';

const transformValkyrieItemToGameData = (
  valkyrieItems: (ValkyrieStoreIncludedItem | null)[],
): (GameData | null)[] => {
  return valkyrieItems
    .filter(
      item =>
        item === null ||
        (!!item.attributes['primary-classification'] &&
          item.attributes.skus !== undefined),
    )
    .map(item => {
      if (item === null) {
        return null;
      }
      const skuWithDiscount = item.attributes.skus!.find(
        sku =>
          sku.prices['non-plus-user']['discount-percentage'] > 0 ||
          sku.prices['plus-user']['discount-percentage'] > 0,
      );
      const plusUserPricing = skuWithDiscount!.prices['plus-user'];
      const nonPlusUserPricing = skuWithDiscount!.prices['non-plus-user'];
      return {
        // _originalData: item,
        id: item.id,
        name: item.attributes.name,
        platforms: item.attributes.platforms,
        starRating: item.attributes['star-rating'],
        price: {
          original: {
            display: nonPlusUserPricing['strikethrough-price'].display,
            cents: nonPlusUserPricing['strikethrough-price'].value,
          },
          nonPlus: {
            cents: nonPlusUserPricing['actual-price'].value,
            display: nonPlusUserPricing['actual-price'].display,
            discountPercentage: nonPlusUserPricing['discount-percentage'],
          },
          plus: {
            cents: plusUserPricing['actual-price'].value,
            display: plusUserPricing['actual-price'].display,
            discountPercentage: plusUserPricing['discount-percentage'],
          },
        },
        thumbnailBase: item.attributes['thumbnail-url-base'] as string,
        mediaList: item.attributes['media-list'] as GameMediaList,
      };
    });
};

export default transformValkyrieItemToGameData;

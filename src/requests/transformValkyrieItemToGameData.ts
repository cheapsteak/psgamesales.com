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
      const sku =
        item.attributes.skus!.find(
          sku =>
            sku.prices['non-plus-user']['discount-percentage'] > 0 ||
            sku.prices['plus-user']['discount-percentage'] > 0,
        ) || item.attributes.skus![0];
      const plusUserPricing = sku!.prices['plus-user'];
      const nonPlusUserPricing = sku!.prices['non-plus-user'];
      return {
        _originalData: item,
        id: item.id,
        name: item.attributes.name,
        platforms: item.attributes.platforms,
        starRating: item.attributes['star-rating'],
        contentType:
          item.attributes['game-content-type'] ||
          item.attributes['secondary-classification'],
        price: {
          type:
            item.attributes['upsell-info'] &&
            item.attributes['upsell-info'].type,
          original: {
            display: nonPlusUserPricing['strikethrough-price']
              ? nonPlusUserPricing['strikethrough-price'].display
              : nonPlusUserPricing['actual-price'].display,
            cents: nonPlusUserPricing['strikethrough-price']
              ? nonPlusUserPricing['strikethrough-price'].value
              : nonPlusUserPricing['actual-price'].value,
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
        originalFields: {
          type: item.type as 'legacy-sku' | 'game-related' | 'game',
        },
      };
    });
};

export default transformValkyrieItemToGameData;

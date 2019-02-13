import { Country } from 'src/constants/countries';
import {
  RegionStorefronts,
  AMERICAN_STOREFRONTS,
  ASIAN_STOREFRONTS,
  EUROPEAN_STOREFRONTS,
} from 'src/constants';

type RegionCode = 'americas' | 'europe' | 'asia';

export const getRegionCodeByCountryCode = (
  countryCode: Country['code'],
): RegionCode => {
  switch (countryCode.toLowerCase()) {
    case 'mx':
    case 'ca':
    case 'us':
    case 'br':
    case 'ar':
    case 'ec':
      return 'americas';
    // asian?
    case 'hk':
    case 'id':
    case 'kr':
    case 'my':
    case 'th':
    case 'sg':
      return 'asia';
    // european?
    case 'au':
    case 'ae':
    case 'be':
    case 'at':
    case 'cy':
    case 'dk':
    case 'fi':
    case 'fr':
    case 'de':
    case 'in':
    case 'ie':
    case 'it':
    case 'ae':
    case 'lu':
    case 'mt':
    case 'nl':
    case 'nz':
    case 'no':
    case 'sa':
    case 'za':
    case 'es':
    case 'ch':
    case 'tr':
    case 'gb':
    case 'pl':
    case 'pt':
    case 'ru':
    case 'se':
      return 'europe';
    default:
      return 'americas';
  }
};

export const mapCountryToMsftCode = (countryCode: Country['code']) => {
  const regionCode = getRegionCodeByCountryCode(countryCode);
  switch (regionCode.toLowerCase()) {
    case 'americas':
      return 'MSF77008';
    case 'asia':
      return 'MSF86012';
    case 'europe':
    default:
      return 'MSF75508';
  }
};

export const getRegionStorefrontsByCountryCode = (
  countryCode: Country['code'],
): RegionStorefronts => {
  const regionCode = getRegionCodeByCountryCode(countryCode);
  switch (regionCode.toLowerCase()) {
    case 'americas':
      return AMERICAN_STOREFRONTS;
    case 'asia':
      return ASIAN_STOREFRONTS;
    case 'europe':
    default:
      return EUROPEAN_STOREFRONTS;
  }
};

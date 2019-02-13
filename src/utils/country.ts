import { countries } from 'src/constants';
import { Country } from 'src/constants/countries';

export const getLanguageByCountryCode = (countryCode: Country['code']) => {
  const country = countries.find(
    country => country.code === countryCode.toLowerCase(),
  );
  if (!country) {
    throw new Error(`Could not find country with code of ${countryCode}`);
  }
  return country.languageCode;
};

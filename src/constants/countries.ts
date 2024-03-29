/*

This blob is generated by running this snippet on https://www.playstation.com/country-selector/index.html

var countries = Array.from(document.querySelectorAll('.c-list li a'))
  .map(anchor => {
    const matches = anchor
      .getAttribute('href')
      .match(/\/([a-z]{2})-([a-z]{2})\/$/);
    if (!matches) return null;
    return {
      name: anchor.innerText.split('(')[0].trim(),
      code: matches[2],
      languageCode: matches[1],
    };
  })
  .filter(Boolean);
*/

export interface Country {
  name: string;
  languageCode: string;
  code: string;
}

export const keyCountry = (country: Country) => `${country.name}:${country.code}:${country.languageCode}`;

export const UNITED_STATES = { name: 'United States', languageCode: 'en', code: 'us' };
export const CANADA = { name: 'Canada', languageCode: 'en', code: 'ca' };

const countriesWithoutKeys = [
  { name: 'Argentina', languageCode: 'es', code: 'ar' },
  { name: 'Australia', languageCode: 'en', code: 'au' },
  { name: 'Austria', languageCode: 'de', code: 'at' },
  { name: 'Bahrain', languageCode: 'en', code: 'ae' },
  { name: 'Belgium', languageCode: 'fr', code: 'be' },
  // { name: 'Belgium', languageCode: 'nl', code: 'be' },
  { name: 'Brasil', languageCode: 'pt', code: 'br' },
  // { name: 'Bulgaria', languageCode: 'bg', code: 'bg' },
  CANADA,
  // { name: 'Canada', languageCode: 'fr', code: 'ca' },
  { name: 'Chile', languageCode: 'es', code: 'cl' },
  { name: 'Colombia', languageCode: 'es', code: 'co' },
  { name: 'Costa Rica', languageCode: 'es', code: 'cr' },
  { name: 'Croatia', languageCode: 'hr', code: 'hr' },
  { name: 'Cyprus', languageCode: 'en', code: 'cy' },
  { name: 'Czech Republic', languageCode: 'cs', code: 'cz' },
  { name: 'Denmark', languageCode: 'da', code: 'dk' },
  { name: 'Ecuador', languageCode: 'es', code: 'ec' },
  { name: 'El Salvador', languageCode: 'es', code: 'sv' },
  { name: 'Finland', languageCode: 'fi', code: 'fi' },
  { name: 'France', languageCode: 'fr', code: 'fr' },
  { name: 'Germany', languageCode: 'de', code: 'de' },
  { name: 'Greece', languageCode: 'el', code: 'gr' },
  { name: 'Guatemala', languageCode: 'es', code: 'gt' },
  { name: 'Honduras', languageCode: 'es', code: 'hn' },
  { name: 'Hong Kong', languageCode: 'en', code: 'hk' },
  { name: 'Hungary', languageCode: 'hu', code: 'hu' },
  // { name: 'Iceland', languageCode: 'is', code: 'is' },
  { name: 'India', languageCode: 'en', code: 'in' },
  { name: 'Indonesia', languageCode: 'en', code: 'id' },
  { name: 'Ireland', languageCode: 'en', code: 'ie' },
  { name: 'Italy', languageCode: 'it', code: 'it' },
  { name: 'Korea', languageCode: 'ko', code: 'kr' },
  { name: 'Kuwait', languageCode: 'en', code: 'ae' },
  { name: 'Lebanon', languageCode: 'en', code: 'ae' },
  { name: 'Luxembourg', languageCode: 'fr', code: 'lu' },
  { name: 'Malaysia', languageCode: 'en', code: 'my' },
  { name: 'Malta', languageCode: 'en', code: 'mt' },
  { name: 'Mexico', languageCode: 'es', code: 'mx' },
  { name: 'Nederland', languageCode: 'nl', code: 'nl' },
  { name: 'New Zealand', languageCode: 'en', code: 'nz' },
  { name: 'Nicaragua', languageCode: 'es', code: 'ni' },
  { name: 'Norway', languageCode: 'no', code: 'no' },
  { name: 'Oman', languageCode: 'en', code: 'ae' },
  { name: 'Panama', languageCode: 'es', code: 'pa' },
  { name: 'Peru', languageCode: 'es', code: 'pe' },
  { name: 'Philippines', languageCode: 'en', code: 'ph' },
  { name: 'Poland', languageCode: 'pl', code: 'pl' },
  { name: 'Portugal', languageCode: 'pt', code: 'pt' },
  { name: 'Qatar', languageCode: 'en', code: 'ae' },
  { name: 'Romania', languageCode: 'ro', code: 'ro' },
  { name: 'Russia', languageCode: 'ru', code: 'ru' },
  { name: 'Saudi Arabia', languageCode: 'ar', code: 'sa' },
  { name: 'Singapore', languageCode: 'en', code: 'sg' },
  { name: 'Slovenia', languageCode: 'sl', code: 'si' },
  { name: 'Slovakia', languageCode: 'sk', code: 'sk' },
  { name: 'South Africa', languageCode: 'en', code: 'za' },
  { name: 'Spain', languageCode: 'es', code: 'es' },
  { name: 'Sweden', languageCode: 'sv', code: 'se' },
  { name: 'Switzerland', languageCode: 'de', code: 'ch' },
  // { name: 'Switzerland', languageCode: 'fr', code: 'ch' },
  // { name: 'Switzerland', languageCode: 'it', code: 'ch' },
  { name: 'Thailand', languageCode: 'en', code: 'th' },
  // { name: 'Thailand', languageCode: 'th', code: 'th' },
  { name: 'Turkey', languageCode: 'tr', code: 'tr' },
  { name: 'Ukraine', languageCode: 'uk', code: 'ua' },
  {
    name: 'United Arab Emirates',
    languageCode: 'en',
    code: 'ae',
  },
  UNITED_STATES,
  { name: 'United Kingdom', languageCode: 'en', code: 'gb' },
  { name: 'Vietnam', languageCode: 'en', code: 'vn' },
] as const;

const countries = countriesWithoutKeys.map(country => ({
  ...country,
  key: keyCountry(country),
}));

export default countries;

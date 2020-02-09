export const storefront = (
  countryCode = ":countryCode",
  languageCode = ":languageCode",
  storeId = ":storeId"
) => `/stores/${countryCode}/${languageCode}/${storeId}`;

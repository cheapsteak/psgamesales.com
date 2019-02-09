import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import countries, { Country } from 'src/constants/countries';
import { Platform, ContentType } from './types';

let storedUserOptions;

try {
  storedUserOptions = JSON.parse(
    localStorage.getItem('psgamesales:user-options') || '{}',
  );
} catch (e) {
  console.error('Failed to retrieve stored user options', e);
}

const defaultUserOptions = {
  language: 'en',
  country: undefined,
  hasUserExplicitlySetCountryKey: false,
  pricingDisplayMode: 'only_plus',
  platforms: [Platform.PS4],
  contentTypes: [ContentType.Games, ContentType.Bundles, ContentType.Addons],
  ...storedUserOptions,
};

type PricingDisplayModeOptions =
  | 'only_plus'
  | 'only_non_plus'
  | 'plus_and_non_plus';

export const UserOptionsContext: React.Context<{
  language: string;
  country?: Country;
  hasUserExplicitlySetCountryKey: boolean;
  pricingDisplayMode: PricingDisplayModeOptions;
  platforms: Platform[];
  contentTypes: ContentType[];
  setUserOptions: Dispatch<
    SetStateAction<{
      language?: string;
      country?: Country;
      hasUserExplicitlySetCountryKey?: boolean;
      pricingDisplayMode?: PricingDisplayModeOptions;
      platforms?: Platform[];
      contentTypes?: ContentType[];
    }>
  >;
}> = React.createContext({
  ...defaultUserOptions,
  setUserOptions: options => {},
});

export const UserOptionsContextProvider: React.FunctionComponent = props => {
  const [userOptions, setUserOptions] = useState(defaultUserOptions);

  useEffect(() => {
    !userOptions.hasUserExplicitlySetCountryKey &&
      fetch('https://us-central1-psgamedeals.cloudfunctions.net/geolocation')
        .then(res => res.json())
        .then(geoInfo => {
          const countryFromGeoInfo = countries.find(
            country => country.code === geoInfo.country.toLowerCase(),
          );

          if (!countryFromGeoInfo) {
            throw new Error(
              `Could not find country geoInfo, ${JSON.stringify(geoInfo)}`,
            );
          }
          setUserOptions({
            ...userOptions,
            country: countryFromGeoInfo,
          });
        })
        .catch(e => {
          console.error(e);
          // couldn't automatically determine country. set a default value
          // todo: ask user to select their country?
          setUserOptions({
            ...userOptions,
            country: countries.find(country => country.code === 'us'),
          });
        });
  }, []);

  return (
    <UserOptionsContext.Provider
      value={{
        ...userOptions,
        setUserOptions: newOptions => {
          const combinedOptions = { ...userOptions, ...newOptions };
          setUserOptions(combinedOptions);
          try {
            localStorage.setItem(
              'psgamesales:user-options',
              JSON.stringify(combinedOptions),
            );
          } catch (e) {
            console.log('Failed to set user options', e);
          }
        },
      }}
    >
      {props.children}
    </UserOptionsContext.Provider>
  );
};

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
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
  hasUserExplicitlySetCountryCode: false,
  pricingDisplayMode: 'only_plus',
  platforms: [Platform.PS4],
  contentTypes: [ContentType.Games, ContentType.Bundles],
  ...storedUserOptions,
};

type PricingDisplayModeOptions =
  | 'only_plus'
  | 'only_non_plus'
  | 'plus_and_non_plus';

export const UserOptionsContext: React.Context<{
  language: string;
  country?: string;
  hasUserExplicitlySetCountryCode: boolean;
  pricingDisplayMode: PricingDisplayModeOptions;
  platforms: Platform[];
  contentTypes: ContentType[];
  setUserOptions: Dispatch<
    SetStateAction<{
      language?: string;
      country?: string;
      hasUserExplicitlySetCountryCode?: boolean;
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
    !userOptions.hasUserExplicitlySetCountryCode &&
      fetch('https://us-central1-psgamedeals.cloudfunctions.net/geolocation')
        .then(res => res.json())
        .then(geoInfo =>
          setUserOptions({
            ...userOptions,
            country: geoInfo.country.toLowerCase(),
          }),
        )
        .catch(e => {
          console.error(e);
          // couldn't automatically determine country. set a default value
          // todo: ask user to select their country?
          setUserOptions({
            ...userOptions,
            country: 'us',
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

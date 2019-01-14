import React, { Dispatch, SetStateAction, useState } from 'react';
import { Platform, ContentType } from './types';

let storedUserOptions;

try {
  storedUserOptions = JSON.parse(localStorage.getItem('user-options') || '{}');
} catch (e) {
  console.error('Failed to retrieve stored user options', e);
}

const defaultUserOptions = {
  language: 'en',
  country: 'ca',
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
  country: string;
  pricingDisplayMode: PricingDisplayModeOptions;
  platforms: Platform[];
  contentTypes: ContentType[];
  setUserOptions: Dispatch<
    SetStateAction<{
      language?: string;
      country?: string;
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
  return (
    <UserOptionsContext.Provider
      value={{
        ...userOptions,
        setUserOptions: newOptions => {
          const combinedOptions = { ...userOptions, ...newOptions };
          setUserOptions(combinedOptions);
          try {
            localStorage.setItem(
              'user-options',
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

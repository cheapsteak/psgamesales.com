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
  hasPlusMembership: false,
  platforms: [Platform.PS4],
  // gameTypes: [GameType.Bundles, GameType.PS4_Full_Games, GameType.PSN_Games],
  contentTypes: [ContentType.Games, ContentType.Bundles],
  ...storedUserOptions,
};

export const UserOptionsContext: React.Context<{
  language: string;
  country: string;
  hasPlusMembership: boolean;
  platforms: Platform[];
  // gameTypes: GameType[];
  contentTypes: ContentType[];
  setUserOptions: Dispatch<
    SetStateAction<{
      language?: string;
      country?: string;
      hasPlusMembership?: boolean;
      platforms?: Platform[];
      // gameTypes?: GameType[];
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

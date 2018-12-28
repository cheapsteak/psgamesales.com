import React, { Dispatch, SetStateAction, useState } from 'react';
import _ from 'lodash';
import { Platform, GameType } from './types';

const defaultUserOptions = {
  language: 'en',
  country: 'ca',
  hasPlusMembership: false,
  platforms: [Platform.PS4],
  gameTypes: [GameType.Bundles, GameType.PS4_Full_Games, GameType.PSN_Games],
};

export const UserOptionsContext: React.Context<{
  language: string;
  country: string;
  hasPlusMembership: boolean;
  platforms: Platform[];
  gameTypes: GameType[];
  setUserOptions: Dispatch<
    SetStateAction<{
      language?: string;
      country?: string;
      hasPlusMembership?: boolean;
      platforms?: Platform[];
      gameTypes?: GameType[];
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
        ...defaultUserOptions,
        setUserOptions: newOptions =>
          setUserOptions({ ...userOptions, ...newOptions }),
      }}
    >
      {props.children}
    </UserOptionsContext.Provider>
  );
};

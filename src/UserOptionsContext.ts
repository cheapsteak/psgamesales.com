import React, { Dispatch, SetStateAction } from 'react';
import _ from 'lodash';

export const UserOptionsContext: React.Context<{
  language: string;
  country: string;
  hasPlusMembership: boolean;
  setLanguage: Dispatch<SetStateAction<string>>;
  setCountry: Dispatch<SetStateAction<string>>;
  setHasPlusMembership: Dispatch<SetStateAction<boolean>>;
}> = React.createContext({
  language: 'en',
  country: 'ca',
  hasPlusMembership: false,

  setLanguage: language => {},
  setCountry: country => {},
  setHasPlusMembership: hasPlusMembership => {},
});

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import _ from 'lodash';
import { css } from 'emotion';
import { fetchGamesFromStore } from './fetchGamesFromStore';
import { GameData } from './GameData';
import GamesList from './GamesList';

const storeName = `STORE-MSF77008-HOLIDAYSALELP`;

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

function App() {
  const [games, setGames] = useState<GameData[]>([]);
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('ca');
  const [hasPlusMembership, setHasPlusMembership] = useState(false);

  useEffect(() => {
    fetchGamesFromStore(storeName).then(returnedGames =>
      setGames(returnedGames),
    );
  }, []);

  return (
    <UserOptionsContext.Provider
      value={{
        language,
        country,
        hasPlusMembership,
        setLanguage,
        setCountry,
        setHasPlusMembership,
      }}
    >
      <div className={'App '}>
        {games ? <GamesList games={games} /> : 'loading...'}
      </div>
    </UserOptionsContext.Provider>
  );
}

export default App;

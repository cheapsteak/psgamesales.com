import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import _ from 'lodash';
import { css } from 'emotion';
import fetchGamesFromStore from './fetchGamesFromStore';
import { GameData } from './GameData';
import GamesList from './GamesList';
import Controls from './Controls';

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
  const [hasPlusMembership, setHasPlusMembership] = useState(true);

  useEffect(() => {
    fetchGamesFromStore({ store: storeName, language, country }).then(
      returnedGames => setGames(returnedGames),
    );
  }, []);

  window['games'] = games;

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
        <div
          className={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <div>
            <Controls />
          </div>
          <div
            className={css`
              flex: 1 1 auto;
            `}
          >
            {games ? <GamesList games={games} /> : 'loading...'}
          </div>
        </div>
      </div>
    </UserOptionsContext.Provider>
  );
}

export default App;

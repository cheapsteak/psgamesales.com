import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import _ from 'lodash';
import { useLocation } from '@reach/router/unstable-hooks';
import { css } from 'emotion';
import fetchGamesFromStore from './fetchGamesFromStore';
import { GameData } from './GameData';
import GamesList from './GamesList';
import Controls from './Controls';
import querystring from 'querystring';
import queryParamDict from './queryParamDict';

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
  const [location] = useLocation();

  useEffect(() => {
    fetchGamesFromStore({ store: storeName, language, country }).then(
      returnedGames => setGames(returnedGames),
    );
  }, []);

  window['games'] = games;

  const gameQuery = querystring.parse(location.search.replace(/^\?/, ''))[
    queryParamDict.GAME_SEARCH
  ] as string;

  const gamesToShow =
    gameQuery.length > 0
      ? games.filter(game => game.name.toLowerCase().includes(gameQuery))
      : games;

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
            {gamesToShow ? <GamesList games={gamesToShow} /> : 'loading...'}
          </div>
        </div>
      </div>
    </UserOptionsContext.Provider>
  );
}

export default App;

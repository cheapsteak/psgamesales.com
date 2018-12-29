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
import { UserOptionsContextProvider } from './UserOptionsContext';
import { Platform, GameType } from './types';
import GamesProvider from './GamesProvider';

const storeName = `STORE-MSF77008-HOLIDAYSALELP`;

function App() {
  const [location] = useLocation();

  const gameQuery = querystring.parse(location.search.replace(/^\?/, ''))[
    queryParamDict.GAME_SEARCH
  ];

  return (
    <div className={'App '}>
      <UserOptionsContextProvider>
        <GamesProvider>
          {({ games, isLoading }) => {
            window['games'] = games;
            const gamesToShow =
              gameQuery && gameQuery.length > 0
                ? games.filter(game =>
                    game.name.toLowerCase().includes(gameQuery),
                  )
                : games;

            return (
              <div
                className={css`
                  display: flex;
                  flex-direction: row;
                `}
              >
                <div>
                  <Controls isLoading={isLoading} />
                </div>
                <div
                  className={css`
                    flex: 1 1 auto;
                  `}
                >
                  {gamesToShow ? (
                    <GamesList games={gamesToShow} />
                  ) : (
                    'loading...'
                  )}
                </div>
              </div>
            );
          }}
        </GamesProvider>
      </UserOptionsContextProvider>
    </div>
  );
}

export default App;

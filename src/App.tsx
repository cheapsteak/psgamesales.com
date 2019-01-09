import React from 'react';
import { useLocation } from '@reach/router/unstable-hooks';
import { css } from 'emotion';
import GamesList from './GamesList';
import Controls from './Controls';
import querystring from 'querystring';
import queryParamDict from './queryParamDict';
import { UserOptionsContextProvider } from './UserOptionsContext';
import GamesProvider from './GamesProvider';
import FancyLoader from './FancyLoader';

function App() {
  const [location] = useLocation();

  const gameQuery = querystring.parse(location.search.replace(/^\?/, ''))[
    queryParamDict.GAME_SEARCH
  ];

  return (
    <div
      className={
        'App ' +
        css`
          height: 100%;
        `
      }
    >
      <UserOptionsContextProvider>
        <GamesProvider>
          {({ games, isLoading, hasPartialContent }) => {
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
                  height: 100%;
                `}
              >
                <div>
                  <Controls isLoading={isLoading} />
                </div>
                <div
                  className={css`
                    flex: 1 1 auto;
                    position: relative;
                  `}
                >
                  {gamesToShow && <GamesList games={gamesToShow} />}
                  {isLoading && (
                    <div
                      className={css`
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background: rgba(
                          255,
                          255,
                          255,
                          ${hasPartialContent ? 0.5 : 0.95}
                        );
                        transition: 0.3s background;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      `}
                    >
                      <FancyLoader />
                    </div>
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

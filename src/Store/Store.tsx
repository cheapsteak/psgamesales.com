import React from 'react';
import { useLocation } from '@reach/router/unstable-hooks';
import { css } from 'emotion';
import querystring from 'querystring';

import GamesList from 'src/GamesList';
import Controls from 'src/Controls';
import queryParamDict from 'src/queryParamDict';
import FancyLoader from 'src/FancyLoader';
import useGames from 'src/useStore';
import transformValkyrieItemToGameData from 'src/requests/transformValkyrieItemToGameData';

const defaultStore = `STORE-MSF77008-HOLIDAYSALELP`;

const Store = () => {
  const [location] = useLocation();

  const { storeItems, isLoading, hasPartialContent } = useGames(defaultStore);
  const games = transformValkyrieItemToGameData(storeItems);
  window['games'] = games;

  const gameQuery = querystring.parse(location.search.replace(/^\?/, ''))[
    queryParamDict.GAME_SEARCH
  ] as string; // cooercing to `string` because we don't expect the query param to appear multiple times

  const gamesToShow =
    gameQuery && gameQuery.length > 0
      ? games.filter(game => game.name.toLowerCase().includes(gameQuery))
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
};

export default Store;

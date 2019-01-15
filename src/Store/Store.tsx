import React, { useContext } from 'react';
import { css } from 'emotion';

import GamesList from 'src/GamesList';
import Controls from 'src/Controls';
import FancyLoader from 'src/FancyLoader';
import { StoreContext } from './StoreContext';

const Store = () => {
  const { gamesMatchingQuery, isLoading, hasPartialContent } = useContext(
    StoreContext,
  );

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
        {gamesMatchingQuery && <GamesList games={gamesMatchingQuery} />}
        {isLoading && !hasPartialContent && (
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

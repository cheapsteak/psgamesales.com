import React, { useContext } from 'react';
import { css } from 'emotion';

import GamesList from 'src/GamesList';
import Controls from 'src/Controls';

import FancyLoader from 'src/FancyLoader';
import { mq } from 'src/constants';
import { StoreContext } from './StoreContext';

const Store = () => {
  const { gamesToShow, isLoading, hasPartialContent } = useContext(
    StoreContext,
  );

  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
        height: 100%;

        ${mq.smallDown} {
          flex-direction: column;
        }
      `}
    >
      <Controls isLoading={isLoading} />
      <div
        className={css`
          flex: 1 1 auto;
          position: relative;
          background-color: #2b3354;
        `}
      >
        {gamesToShow && <GamesList />}
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

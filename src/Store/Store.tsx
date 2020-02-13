import React, { useContext } from 'react';
import { css } from 'emotion';

import GamesList from 'src/GamesList';
import Controls from 'src/Controls';

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
          background-color: ${isLoading && !hasPartialContent
            ? '#462b9c'
            : `#2b3354`};
        `}
      >
        {gamesToShow && <GamesList />}
      </div>
    </div>
  );
};

export default Store;

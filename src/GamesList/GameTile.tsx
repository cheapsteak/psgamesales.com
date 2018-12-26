import querystring from 'querystring';
import React, { useContext } from 'react';
import { css } from 'emotion';
import { UserOptionsContext } from '../App';

const colors = {
  price: '#acdbf5',
  originalPrice: '#7193a6',
};

const GameTile = ({ game, style }) => {
  const { language, country, hasPlusMembership } = useContext(
    UserOptionsContext,
  );
  return (
    <a
      key={game.id}
      href={`https://store.playstation.com/${language}-${country}/product/${
        game.id
      }`}
      target="_blank"
      style={style}
      className={
        `GameInfoLink ` +
        css`
          position: relative;
          flex-grow: 1;
        `
      }
    >
      <img
        src={`${game.thumbnailBase}?${querystring.stringify({
          w: 200,
          h: 200,
        })}`}
        alt={game.name}
        className={css`
          display: block;
          width: 100%;
          height: auto;
        `}
      />

      <div
        className={css`
          position: absolute;
          top: 0;
          padding: 0 1em;
          color: transparent;
        `}
      >
        {game.name}
      </div>

      <div
        className={
          'DiscountBlock ' +
          css`
            position: absolute;
            bottom: 0;
            right: 0;
            background-color: #000000;
            display: flex;
            flex-direction: row;
          `
        }
      >
        <div
          className={css`
            background-color: #8bb006;
            color: #000000;
            padding: 0.05em 0.2em;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
          `}
        >
          {
            (hasPlusMembership ? game.price.plus : game.price.nonPlus)
              .discountPercentage
          }
          %
        </div>
        <div
          className={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            className={css`
              padding: 0.2em 0.2em 0;
              line-height: 1;
              color: ${colors.originalPrice};
              font-size: 12px;
              text-decoration: line-through;
              text-align: right;
            `}
          >
            {game.price.original.display}
          </div>

          <div
            className={css`
              padding: 0 0.2em 0.2em;
              color: ${colors.price};
              font-size: 16px;
              line-height: 1;
            `}
          >
            {(hasPlusMembership ? game.price.plus : game.price.nonPlus).display}
          </div>
        </div>
      </div>
    </a>
  );
};

export default GameTile;

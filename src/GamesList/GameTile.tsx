import querystring from 'querystring';
import React, { useContext, useState } from 'react';
import { css } from 'emotion';
import { UserOptionsContext } from '../App';
import { GameData } from '../GameData';

const colors = {
  price: '#acdbf5',
  originalPrice: '#7193a6',
};

// @ts-ignore-line "Property 'game' does not exist on type '{ children?: ReactNode; }'.ts(2339)"
const GameTile: React.ForwardRefExoticComponent<{
  game: GameData;
  style: any;
}> = React.forwardRef(({ game, style }, ref) => {
  const { language, country, hasPlusMembership } = useContext(
    UserOptionsContext,
  );
  const [retryCount, setRetryCount] = useState(0);
  return (
    <div
      key={game.id}
      // @ts-ignore-line "Type '{}' is missing the following properties from type 'HTMLDivElement': align, addEventListener, removeEventListener, accessKey, and 236 more.ts(2322)"
      ref={ref}
      style={style}
      className={css`
        padding: 0.2em;
      `}
    >
      <a
        href={`https://store.playstation.com/${language}-${country}/product/${
          game.id
        }`}
        target="_blank"
        className={
          `GameInfoLink ` +
          css`
            display: block;
            position: relative;
          `
        }
      >
        <img
          src={`${game.thumbnailBase}?${querystring.stringify({
            w: 200 + retryCount,
            h: 200 + retryCount,
          })}`}
          alt={game.name}
          className={css`
            display: block;
            width: 100%;
            height: auto;
          `}
          // Note: sometimes a dimension will return a bad image
          onError={e => setRetryCount(retryCount + 1)}
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
              {
                (hasPlusMembership ? game.price.plus : game.price.nonPlus)
                  .display
              }
            </div>
          </div>
        </div>
      </a>
    </div>
  );
});

export default GameTile;

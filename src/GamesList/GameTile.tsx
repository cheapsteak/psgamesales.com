import querystring from 'querystring';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { css } from 'emotion';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { GameData } from 'src/GameData';

const colors = {
  price: '#acdbf5',
  originalPrice: '#7193a6',
  gradientFade: 'rgba(255,255,255,0)',
};

const gradientColors = [
  '#845EC2',
  '#D65DB1',
  '#FF6F91',
  '#FF9671',
  '#FFC75F',
  '#F9F871',
];

// @ts-ignore-line "Property 'game' does not exist on type '{ children?: ReactNode; }'.ts(2339)"
const GameTile: React.ForwardRefExoticComponent<{
  game: GameData;
  style: any;
}> = React.forwardRef(({ game, style }, ref) => {
  const { language, country, hasPlusMembership } = useContext(
    UserOptionsContext,
  );
  const [retryCount, setRetryCount] = useState(0);
  const [backgroundImage] = useState(
    _.sampleSize(gradientColors, 3)
      .map(
        color =>
          `radial-gradient(circle at ${_.random(0, 200)}px ${_.random(
            0,
            200,
          )}px, ${color}, ${colors.gradientFade})`,
      )
      .join(', '),
  );
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
        rel="noopener noreferrer"
        className={
          `GameInfoLink ` +
          css`
            display: block;
            position: relative;
            padding-top: 100%;
            background-image: ${backgroundImage};
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
            position: absolute;
            top: 0;
            left: 0;
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

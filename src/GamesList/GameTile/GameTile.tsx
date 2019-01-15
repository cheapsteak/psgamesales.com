import querystring from 'querystring';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { css } from 'emotion';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { GameData } from 'src/GameData';
import colors, { gradientColors } from 'src/constants/colors';
import Price from './Price';

// @ts-ignore-line "Property 'game' does not exist on type '{ children?: ReactNode; }'.ts(2339)"
const GameTile: React.ForwardRefExoticComponent<{
  game: GameData;
  style: any;
}> = React.forwardRef(({ game, style }, ref) => {
  const { language, country } = useContext(UserOptionsContext);
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

        <Price price={game.price} />
      </a>
    </div>
  );
});

export default GameTile;

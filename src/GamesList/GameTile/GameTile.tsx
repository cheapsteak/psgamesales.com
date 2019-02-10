import querystring from 'querystring';
import _ from 'lodash';
import { Rating } from 'semantic-ui-react';
import React, { useContext, useState, useEffect, useReducer } from 'react';
import { css, cx } from 'emotion';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { GameData } from 'src/types';
import colors, { gradientColors } from 'src/constants/colors';
import Price from './Price';

const Screenshots: React.FunctionComponent<{
  screenshots: string[];
}> = ({ screenshots }) => {
  const getNextUrl = currentUrl =>
    screenshots[(screenshots.indexOf(currentUrl) + 1) % screenshots.length];

  const [currentUrl, dispatchChangeUrl] = useReducer(
    currentUrlInState => getNextUrl(currentUrlInState),
    screenshots[0],
  );

  useEffect(() => {
    const interval = global.setInterval(dispatchChangeUrl, 1000);
    return function cleanup() {
      global.clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={css`
        position: relative;
        width: 100%;
        height: 180px;
        background-color: rgba(0, 0, 0, 0.1);
      `}
    >
      {screenshots.map(url => (
        <div
          key={url}
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('${url}');
            background-size: cover;
            background-position: center;
            z-index: ${url === currentUrl ? 1 : 0};
            opacity: ${url === currentUrl ? 1 : 0};
            transition: 0.2s opacity;
        `}
        />
      ))}
    </div>
  );
};

const MoreInfo: React.FunctionComponent<{
  game: GameData;
  className?: string;
  position: 'left' | 'right';
}> = ({ game, className, position }) => {
  return (
    <div
      className={cx(
        'MoreInfo',
        css`
          position: absolute;
          top: 3px;

          width: 180%;
          background-color: #e3eaef;
          background-image: linear-gradient(
            to bottom,
            #e3eaef 0%,
            #c7d5e0 100%
          );
          box-shadow: 0 0 12px #000000;
          color: #333;
          z-index: 1;
          padding: 1em;
          pointer-events: none;

          opacity: 0;
          transition: 0.2s transform, 0.3s opacity;

          &:after {
            content: '';
            display: block;
            width: 6px;
            height: 100%;
            background: linear-gradient(to ${position}, #0000, #9dafbd),
              linear-gradient(to bottom, #e3eaef 0%, #c7d5e0 100%);
            position: absolute;
            top: 0;
          }
          ${position === 'left'
            ? css`
                left: calc(100% + 3px);
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
                border-bottom-left-radius: 2px;
                &:after {
                  left: -6px;
                }
              `
            : css`
                right: calc(100% + 3px);
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px;
                &:after {
                  right: -5px;
                }
              `}
        `,
        className,
      )}
    >
      <h3
        className={css`
          font-size: 17px;
          font-weight: normal;
          margin-bottom: 0.5em;
        `}
      >
        {game.name}
      </h3>
      {game.mediaList.screenshots.length > 0 && (
        <Screenshots
          screenshots={game.mediaList.screenshots.map(
            screenshot => screenshot.url,
          )}
        />
      )}
      {game.starRating && game.starRating.score && (
        <div
          className={css`
            margin-top: 4px;
          `}
        >
          <Rating
            disabled
            rating={Math.floor(game.starRating.score)}
            maxRating={5}
          />
          <span
            className={css`
              margin-left: 3px;
            `}
          >
            {game.starRating.score}{' '}
            <span
              className={css`
                opacity: 0.5;
              `}
            >
              ({game.starRating.total} ratings)
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

// @ts-ignore-line "Property 'game' does not exist on type '{ children?: ReactNode; }'.ts(2339)"
const GameTile: React.ForwardRefExoticComponent<{
  game: GameData;
  style: any;
  tooltipPosition: 'left' | 'right';
}> = React.forwardRef(({ game, style, tooltipPosition }, ref) => {
  const [shouldShowMoreInfo, setShouldShowMoreInfo] = useState(false);
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

  if (!country) {
    throw new Error(`No country found. Shouldn't be rendering GameTile yet.`);
  }

  return (
    <div
      // @ts-ignore-line "Type '{}' is missing the following properties from type 'HTMLDivElement': align, addEventListener, removeEventListener, accessKey, and 236 more.ts(2322)"
      ref={ref}
      style={style}
      className={css`
        padding: 3px;
        z-index: 1;
        &:hover {
          z-index: 20;
          & .MoreInfo {
            opacity: 1;
            pointer-events: initial;
          }
        }
      `}
      onMouseOver={() => !shouldShowMoreInfo && setShouldShowMoreInfo(true)}
      onMouseEnter={() => setShouldShowMoreInfo(true)}
      onMouseLeave={() => setShouldShowMoreInfo(false)}
    >
      <a
        href={`https://store.playstation.com/${language}-${
          country.code
        }/product/${game.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(
          `GameInfoLink`,
          css`
            background-image: ${backgroundImage};
          `,
          css`
            display: block;
            position: relative;
            padding-top: 100%;
            box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
            border-radius: 2px;
            overflow: hidden;
          `,
        )}
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
      {shouldShowMoreInfo && (
        <MoreInfo game={game} position={tooltipPosition} />
      )}
    </div>
  );
});

export default GameTile;

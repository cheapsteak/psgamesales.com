import _ from 'lodash';
import React, { useMemo } from 'react';
import { css, cx } from 'emotion';
import { gradientColors } from 'src/constants/colors';

const LoadingTile: React.ForwardRefExoticComponent<{
  style: any;
  // eslint-disable-next-line react/display-name
}> = React.forwardRef(({ style }, ref) => {
  const backgroundImage = useMemo(() => {
    const bgBase = _.sample(gradientColors);
    const x = () => _.random(-50, 250);
    const y = () => _.random(-50, 250);
    const radius = () => _.random(120, 220);
    return _.sampleSize(gradientColors, 3)
      .map(
        color =>
          `radial-gradient(circle ${radius()}px at ${x()}px ${y()}px, ${color}, transparent)`,
      )
      .concat(`linear-gradient(to right, ${bgBase}, ${bgBase})`)
      .join(', ');
  }, []);

  return (
    <div
      // @ts-ignore-line "Type '{}' is missing the following properties from type 'HTMLDivElement': align, addEventListener, removeEventListener, accessKey, and 236 more.ts(2322)"
      ref={ref}
      style={style}
      className={css`
        padding: 0.2em;
      `}
    >
      <div
        className={cx(
          'BackgroundGradient',
          css`
            display: block;
            position: relative;
            padding-top: 100%;
            background-image: ${backgroundImage};
          `,
        )}
      />
    </div>
  );
});

export default LoadingTile;

import _ from 'lodash';
import React, { useState } from 'react';
import { css, cx } from 'emotion';
import colors, { gradientColors } from 'src/constants/colors';

const LoadingTile: React.ForwardRefExoticComponent<{
  style: any;
}> = React.forwardRef(({ style }, ref) => {
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

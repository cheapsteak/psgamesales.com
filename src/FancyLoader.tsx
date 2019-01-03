import React from 'react';
import _ from 'lodash';
import { css, keyframes } from 'emotion';

const disappear = keyframes`
  0% {
    background-color: #f2fdff;
    transform: scale(1.1, 1.1);
    opacity: 1;
  }
  100% {
    background-color : #a2edef;
    transform: scale(0, 0);
    opacity: 0;
  }
`;

// eslint-disable-next-line prettier/prettier
const animationDelayMap = [
  200, 300, 500,
  300, 500, 700,
  500, 700, 800,
];

// Source: Erik Martinez's https://codepen.io/ErikMj12/pen/WowNvm

const FancyLoader: React.FunctionComponent = () => (
  <div
    className={
      'FancyLoader ' +
      css`
        width: 100px;
        height: 100px;
      `
    }
  >
    {_.range(9).map(x => (
      <div
        className={css`
          background: #888888;
          border-radius: 2px;
          float: left;
          clear: right;
          margin: 3px;
          width: 27px;
          height: 27px;
          animation-name: ${disappear};
          animation-direction: alternate;
          animation-duration: 800ms;
          animation-iteration-count: infinite;
          animation-delay: ${animationDelayMap[x]}ms;
        `}
      />
    ))}
  </div>
);

export default FancyLoader;

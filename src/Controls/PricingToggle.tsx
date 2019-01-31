import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { css } from 'emotion';
import { cx } from 'emotion/macro';
import { mq } from 'src/constants';

const MobilePricingToggle: React.FunctionComponent<{
  className?: string;
  checked: boolean;
  onChange?: (event, data) => any;
}> = ({ className, checked, onChange }) => (
  <Checkbox
    toggle
    className={cx(
      css`
        &&& input {
          & ~ .box,
          & ~ label {
            &:after {
              transition: 0.1s transform;
            }
          }
          &:focus:checked,
          &:checked {
            & ~ .box,
            & ~ label {
              &:before {
                background-color: #f6ce1e !important;
                box-shadow: -1px 2px 3px 0px inset rgba(0, 0, 0, 0.2);
              }
              &:after {
                left: -0.05rem;
                transform: translateX(30px);
              }
            }
          }
          &:not(:checked),
          &:focus:not(:checked) {
            & ~ .box,
            & ~ label {
              &:before {
                background-color: #bbb !important;
                box-shadow: -1px 2px 3px 0px inset rgba(0, 0, 0, 0.2);
              }
              &:after {
                left: -0.05rem;
                transform: translateX(0);
              }
            }
          }
        }
      `,
      className,
    )}
    checked={checked}
    onChange={onChange}
    label={{
      children: (
        <img
          className={cx(
            'plus-icon',
            css`
              z-index: 3;
              display: block;
              position: absolute;
              left: 3px;
              ${mq.smallDown} {
                left: 2px;
              }
              top: 3px;
              transition: 0.1s all;
            `,
            checked
              ? css`
                  transform: translateX(31px);
                  filter: grayscale(0);
                `
              : css`
                  filter: grayscale(1);
                  transform: translateX(0);
                `,
          )}
          src={require('src/assets/plus-logo-yellow.png')}
          alt=""
        />
      ),
    }}
  />
);

export default MobilePricingToggle;

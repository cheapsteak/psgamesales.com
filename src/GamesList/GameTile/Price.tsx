import React, { useContext } from 'react';
import { css } from 'emotion';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { GameDataPrice } from 'src/types';

const colors = {
  price: '#acdbf5',
  plusPrice: '#ffbf0a',
  originalPrice: '#7193a6',
};

const Price: React.FunctionComponent<
  {
    price: GameDataPrice;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ price, className }) => {
  const { pricingDisplayMode } = useContext(UserOptionsContext);
  const plusHasHigherDiscount = price.plus.cents < price.nonPlus.cents;
  const shouldShowNonPlusPricing =
    pricingDisplayMode !== 'only_plus' || !plusHasHigherDiscount;
  const shouldShowPlusPricing =
    plusHasHigherDiscount && pricingDisplayMode !== 'only_non_plus';

  return (
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
        ` +
        ` ${className}`
      }
    >
      {pricingDisplayMode !== 'plus_and_non_plus' && (
        <div
          className={
            'PercentageBlock ' +
            css`
              background-color: #8bb006;
              color: #000000;
              padding: 0.05em 0.2em;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              font-size: 22px;
            `
          }
        >
          {shouldShowPlusPricing && (
            <img
              className={css`
                margin-right: 0.2em;
                filter: hue-rotate(10deg);
              `}
              src={require('src/assets/plus-logo-yellow.png')}
              alt=""
            />
          )}
          {pricingDisplayMode === 'only_plus' && price.plus.discountPercentage}
          {pricingDisplayMode === 'only_non_plus' &&
            price.nonPlus.discountPercentage}
          %
        </div>
      )}
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
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
          {price.original.display}
        </div>

        {shouldShowNonPlusPricing && (
          <div
            className={css`
              padding: 0 0.2em 0.2em;
              color: ${colors.price};
              font-size: 16px;
              line-height: 1;
            `}
          >
            {price.nonPlus.display}
          </div>
        )}

        {shouldShowPlusPricing && (
          <div
            className={css`
              padding: 0 0.2em 0.2em;
              color: ${colors.plusPrice};
              font-size: 16px;
              line-height: 1;
            `}
          >
            {price.plus.display}
          </div>
        )}
      </div>
    </div>
  );
};

export default Price;

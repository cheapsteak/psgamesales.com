import React, { useContext } from 'react';
import { cx, css } from 'emotion';
import { UserOptionsContext } from 'src/UserOptionsContext';
import PricingToggle from '../PricingToggle';

const Price: React.FunctionComponent<
  React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const { setUserOptions } = useContext(UserOptionsContext);
  const { pricingDisplayMode } = useContext(UserOptionsContext);

  return (
    <div className={cx('FacetWrapper', className)} {...props}>
      <h2
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        Prices
        <PricingToggle
          className={css`
            margin-left: 1em;
          `}
          checked={pricingDisplayMode === 'only_plus'}
          onChange={(event, data) =>
            setUserOptions({
              pricingDisplayMode: data.checked ? 'only_plus' : 'only_non_plus',
            })
          }
        />{' '}
      </h2>
    </div>
  );
};
export default Price;

import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { css, cx } from 'emotion';
import StorefrontContainer from 'src/StorefrontContainer';

const Storefronts: React.FunctionComponent<
  React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const [storefronts] = useContext(StorefrontContainer.Context);
  return (
    <div className={cx('FacetWrapper', className)} {...props}>
      <h2>Stores</h2>

      {storefronts.map(storefront => (
        <Link
          key={storefront.id}
          to={`/stores/${storefront.id}`}
          getProps={({ isCurrent }) => ({
            className: cx(
              css`
                display: block;
                color: rgba(255, 255, 255, 0.85);
                &:hover {
                  color: rgba(255, 255, 255, 1);
                }
              `,
              isCurrent &&
                css`
                  color: rgba(255, 255, 255, 1);
                  font-weight: bold;
                `,
            ),
          })}
        >
          {storefront.name}
        </Link>
      ))}
    </div>
  );
};

export default Storefronts;

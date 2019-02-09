import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { css, cx } from 'emotion';
import StorefrontContainer from '../StorefrontContainer';

const StorefrontList: React.FunctionComponent<{}> = () => {
  const storefronts = useContext(StorefrontContainer.Context);
  return (
    <div className="FacetWrapper">
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

export default StorefrontList;

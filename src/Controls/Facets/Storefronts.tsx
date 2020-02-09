import React, { useContext, useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { useLocation } from '@reach/router/unstable-hooks';
import { css, cx } from 'emotion';
import { mq } from 'src/constants';
import StorefrontContainer from 'src/StorefrontContainer';
import * as routes from 'src/routes';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { StoreContext } from 'src/Store/StoreContext';

export const MobileStoreFronts: React.FC<React.HtmlHTMLAttributes<
  HTMLDivElement
>> = ({ className, ...props }) => {
  const [storefronts] = useContext(StorefrontContainer.Context);
  const { storeMetaData } = useContext(StoreContext);
  const [, navigate] = useLocation();
  const { country } = useContext(UserOptionsContext);
  const [selectedStorefrontId, setSelectedStorefrontId] = useState<
    string | null
  >(null);
  useEffect(() => {
    if (!selectedStorefrontId) {
      return;
    }
    navigate(
      routes.storefront(
        country?.code,
        country?.languageCode,
        selectedStorefrontId,
      ),
    );
    // XXX: navigate changes the URl but the Route component isn't sending any changes to StoreContextProvider
    // Should be fixed once migrated to react-router@6
    window.location.reload();
  }, [selectedStorefrontId]);

  return (
    <div
      className={cx(
        css`
          position: relative;
          overflow: hidden;
          ${mq.mediumUp} {
            display: none;
          }
        `,
        className,
      )}
      {...props}
    >
      <select
        className={css`
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        `}
        defaultValue={storeMetaData.id}
        onChange={event => {
          const selectedStorefrontId = event.target.value;
          const newlySelectedStorefront = storefronts.find(
            storefront => storefront.id === selectedStorefrontId,
          );
          if (!newlySelectedStorefront) {
            throw new Error(
              `Could not find corresponding storefront for key: ${event.target.value}`,
            );
          }
          setSelectedStorefrontId(selectedStorefrontId);
        }}
      >
        {storefronts.map(storefront => (
          <option
            key={storefront.id}
            value={storefront.id}
            selected={storeMetaData.id === storefront.id}
          >
            {storefront.name}
          </option>
        ))}
      </select>
      <span
        className={css`
          font-weight: bold;
        `}
      >
        {storeMetaData.name}
      </span>
    </div>
  );
};

const Storefronts: React.FunctionComponent<React.HtmlHTMLAttributes<
  HTMLDivElement
>> = ({ className, ...props }) => {
  const [storefronts] = useContext(StorefrontContainer.Context);
  const { country } = useContext(UserOptionsContext);

  if (window.innerWidth < 600) {
    return <MobileStoreFronts />;
  }
  return (
    <div className={cx('FacetWrapper', className)} {...props}>
      <h2>Stores</h2>

      {storefronts.map(storefront => (
        <Link
          key={storefront.id}
          to={routes.storefront(
            country?.code,
            country?.languageCode,
            storefront.id,
          )}
          getProps={({ isCurrent }) => ({
            className: cx(
              css`
                display: block;
                color: rgba(255, 255, 255, 0.85);
                line-height: 1.5;
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

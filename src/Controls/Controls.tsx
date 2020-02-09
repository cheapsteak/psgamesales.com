import React, { useContext } from 'react';
import { cx, css } from 'emotion';
import _ from 'lodash';
import { useLocation } from '@reach/router/unstable-hooks';
import { Input, Icon } from 'semantic-ui-react';
import querystring from 'querystring';
import queryParamDict from 'src/queryParamDict';
import { UserOptionsContext } from 'src/UserOptionsContext';
import StorefrontContainer from 'src/StorefrontContainer';
import { mq } from 'src/constants';
import { ReactComponent as IconX } from 'src/assets/icon-x.svg';
import { ReactComponent as IconO } from 'src/assets/icon-o.svg';
import { ReactComponent as IconFatSquare } from 'src/assets/icon-square-fat.svg';
import { ReactComponent as IconTriangle } from 'src/assets/icon-triangle.svg';
import { keyCountry } from 'src/constants/countries';
import Results from './Results';
import MobileCountrySelect from './MobileCountrySelect';
import PricingToggle from './PricingToggle';
import * as Facets from './Facets';

const Controls: React.FunctionComponent<
  {
    isLoading: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ isLoading, className }) => {
  const [location, navigate] = useLocation();
  const {
    country: countryFromUserOptions,
    pricingDisplayMode,
    setUserOptions,
  } = useContext(UserOptionsContext);
  const currentQueryString = location.search.replace(/^\?/, '');

  const searchRef = React.createRef<Input>();
  const resetGameQuery = () => {
    navigate(
      `?${querystring.stringify(
        _.omit(
          querystring.parse(currentQueryString),
          queryParamDict.GAME_SEARCH,
        ),
      )}`,
      { replace: true },
    );
    if (searchRef.current) {
      searchRef.current['inputRef']['value'] = '';
      searchRef.current['inputRef'].focus();
    }
  };
  const currentGameQuery = querystring.parse(currentQueryString)[
    queryParamDict.GAME_SEARCH
  ];

  const [storefronts] = useContext(StorefrontContainer.Context);
  const shouldShowFacets = !!countryFromUserOptions && storefronts.length > 0;

  return (
    <div
      className={cx(
        `Controls`,
        css`
          display: flex;
          flex-direction: column;
          padding: 20px;
          position: relative;
          overflow: hidden;

          & .ui.checkbox:not(.toggle),
          & .ui.radio.checkbox {
            display: block;
            & .box,
            & label {
              &:before {
                top: 2px;
                left: 0px;
                width: 13px;
                height: 13px;
              }
            }
            /* the "dot" and "check" in checkbox/radios*/
            & input:checked ~ .box:after,
            & input:checked ~ label:after {
              color: #5d2dae;
              left: -1px;
            }
          }
          & .ui.radio.checkbox input:checked ~ .box:after,
          & .ui.radio.checkbox input:checked ~ label:after {
            background-color: #5d2dae;
          }
          & > * {
            flex-shrink: 0;
          }

          &,
          & .ui.checkbox label,
          & .ui.checkbox + label {
            color: rgba(255, 255, 255, 0.85);
          }
          & .ui.checkbox input:focus ~ label {
            color: #ffffff;
          }

          h2 {
            color: rgba(255, 255, 255, 0.95);
            margin-bottom: 0.2em;
          }

          background-image: radial-gradient(
              circle at 0 top,
              #4925bd 14%,
              #a46ae247
            ),
            radial-gradient(circle at 140px bottom, #9c6de0, #fff0);

          ${mq.smallDown} {
            /* position: absolute;
            z-index: 1;
            background: #ffffff;
            box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2);
            border-bottom-right-radius: 3px;
            max-height: 96vh;
            overflow: auto; */
            padding: 14px;
            padding-bottom: 6px;
          }

          .FacetWrapper {
            & + .FacetWrapper {
              margin-top: 1em;
            }
          }
        `,
        className,
      )}
    >
      <IconO
        className={css`
          position: absolute;
          height: auto;
          mix-blend-mode: difference;
          opacity: 0.5;
          right: -20px;
          top: -50px;
          width: 360px;
          & path {
            fill: #a60000;
          }
        `}
      />
      <IconTriangle
        className={css`
          position: absolute;
          height: auto;
          mix-blend-mode: difference;
          opacity: 0.5;
          right: -100px;
          top: 90px;
          width: 360px;
          transform: rotateZ(20deg) rotateY(-7deg);
          & path {
            fill: #a60000;
          }
        `}
      />
      <IconFatSquare
        className={css`
          position: absolute;
          height: auto;
          mix-blend-mode: difference;
          opacity: 0.5;
          right: 40px;
          top: 400px;
          width: 130px;
          transform: rotateZ(-7deg) rotateY(20deg);
          & path {
            fill: #a60000;
          }
        `}
      />
      <IconX
        className={css`
          position: absolute;
          height: auto;
          mix-blend-mode: difference;
          opacity: 0.5;
          right: 0px;
          top: 460px;
          width: 360px;
          transform: rotateZ(23deg) rotateY(10deg) rotateX(10deg);
          & path {
            fill: #a60000;
          }
        `}
      />
      <Input
        className={css`
          z-index: 1;
        `}
        ref={searchRef}
        loading={isLoading}
        icon={
          currentGameQuery ? (
            <Icon name="close" link onClick={resetGameQuery} />
          ) : (
            'search'
          )
        }
        placeholder={isLoading ? 'Loading...' : 'Search...'}
        defaultValue={currentGameQuery}
        onKeyUp={e => {
          if (e.key === 'Escape') {
            resetGameQuery();
          }
        }}
        onChange={e => {
          const serializedQueryParams = querystring.stringify({
            ...querystring.parse(currentQueryString),
            [queryParamDict.GAME_SEARCH]: e.target.value,
          });
          navigate(`?${serializedQueryParams}`, { replace: true });
        }}
      />
      <div
        className={css`
          z-index: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-top: 4px;
        `}
      >
        <PricingToggle
          className={css`
            ${mq.mediumUp} {
              display: none !important;
            }
          `}
          checked={pricingDisplayMode === 'only_plus'}
          onChange={(event, data) =>
            setUserOptions({
              pricingDisplayMode: data.checked ? 'only_plus' : 'only_non_plus',
            })
          }
        />
        <Results
          className={css`
            align-self: flex-end;
            margin-left: auto;
          `}
        />
        <MobileCountrySelect
          selectedCountryKey={
            countryFromUserOptions && keyCountry(countryFromUserOptions)
          }
          onChange={selectedCountry =>
            setUserOptions({
              country: selectedCountry,
              hasUserExplicitlySetCountryKey: true,
              language: selectedCountry.languageCode,
            })
          }
        />
      </div>

      <div
        className={cx(
          'ControlsWrapper',
          css`
            z-index: 1;
            ${mq.smallDown} {
              display: none;
            }
          `,
        )}
      >
        {shouldShowFacets && (
          <React.Fragment>
            <Facets.Storefronts />
            <Facets.Price />
            <Facets.CountrySelector />
            {/* <Facets.Platforms />
            <Facets.ContentTypes /> */}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default Controls;

import React, { useContext, useState } from 'react';
import { cx, css } from 'emotion';
import _ from 'lodash';
import { useLocation } from '@reach/router/unstable-hooks';
import { Input, Checkbox, Icon, Flag, FlagNameValues } from 'semantic-ui-react';
import querystring from 'querystring';
import queryParamDict from 'src/queryParamDict';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { countries, colors, facets, mq } from 'src/constants';
import { ReactComponent as IconX } from 'src/assets/icon-x.svg';
import { ReactComponent as IconO } from 'src/assets/icon-o.svg';
import { ReactComponent as IconFatSquare } from 'src/assets/icon-square-fat.svg';
import { ReactComponent as IconTriangle } from 'src/assets/icon-triangle.svg';
import Results from './Results';

const Controls: React.FunctionComponent<
  {
    isLoading: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ isLoading, className }) => {
  const [location, navigate] = useLocation();
  const {
    platforms,
    // contentTypes,
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

          & .ui.checkbox,
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
      <Results
        className={css`
          z-index: 1;
          align-self: flex-end;
          ${mq.smallDown} {
            padding-top: 4px;
          }
        `}
      />

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
        <div className="FacetWrapper">
          <h2>Prices</h2>
          {[
            {
              label: (
                <label
                  className={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  with PS Plus{' '}
                  <img
                    src={require('src/assets/plus-logo-yellow.png')}
                    alt=""
                  />{' '}
                </label>
              ),
              value: 'only_plus',
            },
            {
              label: 'no PS Plus',
              value: 'only_non_plus',
            },
            {
              label: 'show both',
              value: 'plus_and_non_plus',
            },
          ].map(item => (
            <Checkbox
              key={item.value}
              radio
              label={item.label}
              checked={pricingDisplayMode === item.value}
              onChange={() =>
                setUserOptions({
                  pricingDisplayMode: item.value as
                    | 'only_plus'
                    | 'only_non_plus'
                    | 'plus_and_non_plus',
                })
              }
            />
          ))}
        </div>

        <div className="FacetWrapper">
          {(() => {
            const priorityContryCodes = ['us', 'ca'];
            const [isExpanded, setIsExpanded] = useState(false);
            const CountryCheckbox = country => (
              <Checkbox
                key={`${country.code}:${country.name}`}
                radio
                label={
                  <label>
                    <Flag name={country.code as FlagNameValues} />
                    {country.name}
                  </label>
                }
                value={country.code}
                checked={
                  countryFromUserOptions &&
                  countryFromUserOptions.code === country.code
                }
                onChange={() =>
                  setUserOptions({
                    country: country,
                    hasUserExplicitlySetCountryKey: true,
                    language: country.languageCode,
                  })
                }
              />
            );
            const countriesAboveFold = _.uniq([
              ...priorityContryCodes,
              countryFromUserOptions && countryFromUserOptions.code,
            ])
              .filter(Boolean)
              .map(countryCode =>
                countries.find(country => countryCode.includes(country.code)),
              );
            const countriesBelowFold = _.difference(
              countries,
              countriesAboveFold,
            );
            return (
              <React.Fragment>
                <button
                  className={css`
                    cursor: pointer;
                    border: 0;
                    background: transparent;
                    color: #f7d9d9;
                    font-size: 16px;
                    padding: 0;
                  `}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <h2>
                    Country{' '}
                    {isExpanded ? (
                      <Icon name="chevron up" size="small" />
                    ) : (
                      <Icon name="chevron down" size="small" />
                    )}
                  </h2>
                </button>
                <div>
                  {countriesAboveFold.map(CountryCheckbox)}
                  {isExpanded && countriesBelowFold.map(CountryCheckbox)}
                </div>
              </React.Fragment>
            );
          })()}
        </div>

        <div className="FacetWrapper">
          <h2>{facets.platform.name}</h2>
          {facets.platform.values.map(value => (
            <Checkbox
              key={value.key}
              label={value.name}
              value={value.key}
              checked={_.includes(platforms, value.key)}
              onChange={(e, data) => {
                setUserOptions({
                  platforms: _.uniq(
                    (data.checked ? _.concat : _.difference)(platforms, [
                      data.value,
                    ]),
                  ),
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Filtering doesn't work API-side, PSN games aren't included as part of game_content_type=games or game_type=ps4_full_games%2Cpsn_games*/}
      {/* <div>
        <h2>{facets.game_content_type.name}</h2>
        {_.map(facets.game_content_type.values, value => (
          <Checkbox
            key={value.key}
            label={value.name}
            value={value.key}
            checked={_.includes(contentTypes, value.key)}
            onChange={(e, data) => {
              setUserOptions({
                contentTypes: _.uniq(
                  (data.checked ? _.concat : _.difference)(contentTypes, [
                    data.value,
                  ]),
                ),
              });
            }}
          />
        ))}
      </div> */}
    </div>
  );
};
export default Controls;

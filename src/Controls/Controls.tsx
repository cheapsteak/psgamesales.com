import React, { useContext, useState } from 'react';
import { cx, css } from 'emotion';
import _ from 'lodash';
import { useLocation } from '@reach/router/unstable-hooks';
import { Input, Checkbox, Icon, Flag, FlagNameValues } from 'semantic-ui-react';
import querystring from 'querystring';
import queryParamDict from 'src/queryParamDict';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { countries, colors, facets, mq } from 'src/constants';
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
    country: countryCodeFromUserOptions,
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

          & .ui.checkbox {
            display: block;
          }
          & > * {
            flex-shrink: 0;
          }

          ${mq.smallDown} {
            /* position: absolute;
            z-index: 1;
            background: #ffffff;
            box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2);
            border-bottom-right-radius: 3px;
            max-height: 96vh; */
            overflow: auto;
            padding: 14px;
            padding-bottom: 6px;
          }
        `,
        className,
      )}
    >
      <Input
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
          ${mq.smallDown} {
            align-self: flex-end;
            padding-top: 4px;
          }
        `}
      />

      <div
        className={css`
          ${mq.smallDown} {
            display: none;
          }
        `}
      >
        <div>
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

        <div>
          <h2>Country</h2>
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
                checked={countryCodeFromUserOptions === country.code}
                onChange={() =>
                  setUserOptions({
                    country: country.code,
                    hasUserExplicitlySetCountryCode: true,
                    language: country.languageCode,
                  })
                }
              />
            );
            const countriesAboveFold = _.uniq([
              ...priorityContryCodes,
              countryCodeFromUserOptions,
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
              <div>
                {countriesAboveFold.map(CountryCheckbox)}
                <button
                  className={css`
                    cursor: pointer;
                    border: 0;
                    background: transparent;
                    color: ${colors.blue};
                  `}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <React.Fragment>
                      <Icon name="chevron up" /> Less
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Icon name="chevron down" /> More
                    </React.Fragment>
                  )}
                </button>
                {isExpanded && countriesBelowFold.map(CountryCheckbox)}
              </div>
            );
          })()}
        </div>

        <div>
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

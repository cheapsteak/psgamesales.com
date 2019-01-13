import React, { useContext, useState } from 'react';
import { css } from 'emotion';
import _ from 'lodash';
import { useLocation } from '@reach/router/unstable-hooks';
import { Input, Checkbox, Icon, Flag, FlagNameValues } from 'semantic-ui-react';
import querystring from 'querystring';
import queryParamDict from '../queryParamDict';
import { Platform, GameType } from 'src/types';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { countries, colors } from 'src/constants';

const Controls = ({ isLoading }) => {
  const [location, navigate] = useLocation();
  const {
    platforms,
    gameTypes,
    country: userSelectedCountryCode,
    hasPlusMembership,
    setUserOptions,
  } = useContext(UserOptionsContext);
  const userOptions = useContext(UserOptionsContext);
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
      className={
        `Controls ` +
        css`
          opacity: ${isLoading ? 0.5 : 1};

          & .ui.checkbox {
            display: block;
          }
        `
      }
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
        placeholder="Search..."
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

      <div>
        <Checkbox
          label={
            <label
              className={css`
                display: flex;
                align-items: center;
              `}
            >
              <img src={require('src/assets/plus-logo-yellow.png')} alt="" /> PS
              Plus Discount
            </label>
          }
          checked={hasPlusMembership}
          onChange={(e, data) =>
            setUserOptions({
              hasPlusMembership: data.checked,
            })
          }
        />
      </div>

      <div>
        <h2>Country</h2>
        {(() => {
          const priorityContryCodes = ['us', 'ca'];
          const [isExpanded, setIsExpanded] = useState(false);
          const CountryCheckbox = country => (
            <Checkbox
              key={country.code}
              radio
              label={
                <label>
                  <Flag name={country.code as FlagNameValues} />
                  {country.name}
                </label>
              }
              value={country.code}
              checked={userSelectedCountryCode === country.code}
              onChange={(e, data) =>
                setUserOptions({
                  country: country.code,
                  language: country.languageCode,
                })
              }
            />
          );
          const countriesAboveFold = _.uniq([
            ...priorityContryCodes,
            userSelectedCountryCode,
          ]).map(countryCode =>
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
        <h2>Platforms</h2>
        {_.map(Platform, (value, key) => (
          <Checkbox
            key={key}
            label={key}
            value={value}
            checked={_.includes(platforms, value)}
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

      <div>
        <h2>Game Types</h2>
        {_.map(GameType, (value, key) => (
          <Checkbox
            key={key}
            label={key.replace(/_/g, ' ')}
            value={value}
            checked={_.includes(gameTypes, value)}
            onChange={(e, data) => {
              setUserOptions({
                gameTypes: _.uniq(
                  (data.checked ? _.concat : _.difference)(gameTypes, [
                    data.value,
                  ]),
                ),
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default Controls;

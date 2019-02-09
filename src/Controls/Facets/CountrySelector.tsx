import React, { useContext, useState } from 'react';
import { cx, css } from 'emotion';
import _ from 'lodash';
import { Checkbox, Icon, Flag, FlagNameValues } from 'semantic-ui-react';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { countries } from 'src/constants';

const CountrySelector: React.FunctionComponent<
  React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const { country: countryFromUserOptions, setUserOptions } = useContext(
    UserOptionsContext,
  );

  return (
    <div className={cx('FacetWrapper', className)} {...props}>
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
        const countriesBelowFold = _.difference(countries, countriesAboveFold);
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
  );
};
export default CountrySelector;

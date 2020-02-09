import React, { useContext, useState } from "react";
import { cx, css } from "emotion";
import _ from "lodash";
import { Checkbox, Icon, Flag, FlagNameValues } from "semantic-ui-react";
import { useLocation } from "@reach/router/unstable-hooks";
import * as routes from "src/routes";
import { UserOptionsContext } from "src/UserOptionsContext";
import { StoreContext } from "src/Store/StoreContext";
import { countries } from "src/constants";
import { Country, UNITED_STATES, CANADA, keyCountry } from "src/constants/countries";

const CountryCheckbox: React.FC<{
  country: Country;
}> = ({ country }) => {
  const [, navigate] = useLocation();
  const {storeMetaData} = useContext(StoreContext);

  const { country: countryFromUserOptions, setUserOptions } = useContext(
    UserOptionsContext
  );

  return (
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
        countryFromUserOptions && countryFromUserOptions.code === country.code
      }
      onChange={() => {
        setUserOptions({
          country: country,
          hasUserExplicitlySetCountryKey: true,
          language: country.languageCode
        });
        navigate(routes.storefront(country.code, country.languageCode, storeMetaData.id));
      }}
    />
  );
};

const CountrySelector: React.FunctionComponent<React.HtmlHTMLAttributes<
  HTMLDivElement
>> = ({ className, ...props }) => {
  const { country: countryFromUserOptions } = useContext(
    UserOptionsContext
  );
  
  const [isExpanded, setIsExpanded] = useState(false);
  const priorityCountries = [UNITED_STATES, CANADA];

  const countriesAboveFold: Country[] = countryFromUserOptions ? _.uniqBy(
    [...priorityCountries, countryFromUserOptions], keyCountry
  ): priorityCountries;
  const countriesBelowFold = _.differenceBy(countries, countriesAboveFold, keyCountry);

  return (
    <div className={cx("FacetWrapper", className)} {...props}>
      {(() => {
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
                Country{" "}
                {isExpanded ? (
                  <Icon name="chevron up" size="small" />
                ) : (
                  <Icon name="chevron down" size="small" />
                )}
              </h2>
            </button>
            <div>
              {countriesAboveFold.map(country => <CountryCheckbox country={country} key={keyCountry(country)}/>)}
              {isExpanded && countriesBelowFold.map(country => <CountryCheckbox country={country} key={keyCountry(country)}/>)}
            </div>
          </React.Fragment>
        );
      })()}
    </div>
  );
};
export default CountrySelector;

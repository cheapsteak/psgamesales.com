import React from 'react';
import { Flag, FlagNameValues } from 'semantic-ui-react';
import { css } from 'emotion';
import { mq, countries } from 'src/constants';
import { Country, keyCountry } from 'src/constants/countries';

const MobileCountrySelect: React.FunctionComponent<{
  selectedCountryKey?: string;
  onChange: (selectedCountry: Country) => any;
}> = ({ selectedCountryKey, onChange }) => {
  if (!selectedCountryKey) {
    // still undefined, probably loading
    return (
      <div
        className={css`
          width: 23px;
          ${mq.mediumUp} {
            display: none;
          }
        `}
      />
    );
  }
  const selectedCountry = countries.find(
    country => keyCountry(country) === selectedCountryKey,
  );
  if (!selectedCountry) {
    throw new Error(`Invalid country key: "${selectedCountryKey}"`);
  }
  return (
    <div
      className={css`
        position: relative;
        overflow: hidden;
        ${mq.mediumUp} {
          display: none;
        }
      `}
    >
      <select
        className={css`
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        `}
        defaultValue={selectedCountryKey}
        onChange={event => {
          const newlySelectedCountry = countries.find(
            country => keyCountry(country) === event.target.value,
          );
          if (!newlySelectedCountry) {
            throw new Error(
              `Could not find corresponding country for key: ${
                event.target.value
              }`,
            );
          }
          onChange(newlySelectedCountry);
        }}
      >
        {countries.map(country => (
          <option key={keyCountry(country)} value={keyCountry(country)}>
            {country.name}
          </option>
        ))}
      </select>
      <Flag
        className={css`
          &&& {
            margin-right: 0;
            margin-left: 0.5em;
          }
          ${mq.mediumUp} {
            display: none;
          }
        `}
        name={selectedCountry.code as FlagNameValues}
      />
    </div>
  );
};

export default MobileCountrySelect;

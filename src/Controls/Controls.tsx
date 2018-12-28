import React, { useContext } from 'react';
import _ from 'lodash';
import { useLocation } from '@reach/router/unstable-hooks';
import { Input, Checkbox } from 'semantic-ui-react';
import querystring from 'querystring';
import queryParamDict from '../queryParamDict';
import { Platform } from '../types';
import { UserOptionsContext } from '../UserOptionsContext';

const Controls = () => {
  const [location, navigate] = useLocation();
  const { platforms, setUserOptions } = useContext(UserOptionsContext);
  const userOptions = useContext(UserOptionsContext);
  const currentQueryString = location.search.replace(/^\?/, '');
  return (
    <div>
      <Input
        icon="search"
        placeholder="Search..."
        defaultValue={
          querystring.parse(currentQueryString)[queryParamDict.GAME_SEARCH]
        }
        onChange={e => {
          const serializedQueryParams = querystring.stringify({
            ...querystring.parse(currentQueryString),
            [queryParamDict.GAME_SEARCH]: e.target.value,
          });
          navigate(`?${serializedQueryParams}`, { replace: true });
        }}
      />

      <div>
        <h2>Platforms</h2>
        {_.map(Platform, (value, key) => (
          <Checkbox
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

      <pre>{JSON.stringify(userOptions, null, '  ')}</pre>
    </div>
  );
};
export default Controls;

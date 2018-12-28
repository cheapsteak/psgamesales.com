import React from 'react';
import { useLocation } from '@reach/router/unstable-hooks';
import { Input } from 'semantic-ui-react';
import querystring from 'querystring';
import queryParamDict from '../queryParamDict';

const Controls = () => {
  const [location, navigate] = useLocation();
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
    </div>
  );
};
export default Controls;

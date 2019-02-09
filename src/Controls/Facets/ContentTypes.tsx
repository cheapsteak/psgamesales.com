import React, { useContext } from 'react';
import _ from 'lodash';
import { cx } from 'emotion';
import { Checkbox } from 'semantic-ui-react';
import { facets } from 'src/constants';
import { UserOptionsContext } from 'src/UserOptionsContext';

const ContentTypes: React.FunctionComponent<
  React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const { contentTypes, setUserOptions } = useContext(UserOptionsContext);

  /* Filtering doesn't always work API-side, PSN games aren't included as part of game_content_type=games or game_type=ps4_full_games%2Cpsn_games*/
  return (
    <div className={cx('FacetWrapper', className)} {...props}>
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
    </div>
  );
};
export default ContentTypes;

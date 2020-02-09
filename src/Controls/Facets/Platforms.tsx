import React, { useContext } from 'react';
import { cx } from 'emotion';
import _ from 'lodash';
import { Checkbox } from 'semantic-ui-react';
import { UserOptionsContext } from 'src/UserOptionsContext';
import { facets } from 'src/constants';

const Platforms: React.FunctionComponent<
  React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const { platforms, setUserOptions } = useContext(UserOptionsContext);

  return (
    <div className={cx('FacetWrapper', className)} {...props}>
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
                data.checked
                  ? _.concat(platforms, [value.key])
                  : _.difference(platforms, [value.key]),
              ),
            });
          }}
        />
      ))}
    </div>
  );
};
export default Platforms;

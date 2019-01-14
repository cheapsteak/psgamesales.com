import React, { useContext } from 'react';
import { cx, css } from 'emotion/macro';
import { StoreContext } from 'src/Store/StoreContext';

const Results: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
  const { gamesMatchingQuery, isLoading } = useContext(StoreContext);

  if (isLoading) {
    return <div>...loading</div>;
  }

  return (
    <div
      className={cx(
        className,
        css`
          font-size: 12px;
        `,
      )}
    >
      {gamesMatchingQuery.length} results
    </div>
  );
};

export default Results;

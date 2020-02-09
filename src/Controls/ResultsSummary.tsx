import React, { useContext } from 'react';
import { cx, css } from 'emotion/macro';
import { StoreContext } from 'src/Store/StoreContext';

const ResultsSummary: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }) => {
  const { gamesToShow, isLoading } = useContext(StoreContext);

  return (
    <div
      className={cx(
        className,
        css`
          font-size: 12px;
        `,
      )}
    >
      {isLoading ? '...' : gamesToShow.length} results
    </div>
  );
};

export default ResultsSummary;

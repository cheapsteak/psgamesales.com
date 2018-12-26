import React from 'react';
import {
  Grid,
  ColumnSizer,
  AutoSizer,
  WindowScroller,
} from 'react-virtualized';
import { css } from 'emotion';
import { GameData } from '../GameData';
import GameTile from './GameTile';

const GamesList: React.FunctionComponent<{ games: GameData[] }> = ({
  games,
}) => {
  const columnCount = 5;
  const rowCount = Math.ceil(games.length / columnCount);
  return (
    <div
      className={
        `GamesList ` +
        css`
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          display: grid;
          grid-template-columns: repeat(auto-fill, 19%);
          column-gap: 1%;
          row-gap: 12px;
        `
      }
    >
      <WindowScroller>
        {({ height }) => (
          <AutoSizer>
            {({ width }) => (
              <ColumnSizer width={width} columnCount={columnCount}>
                {({ adjustedWidth, getColumnWidth }) => (
                  <Grid
                    cellRenderer={({ columnIndex, rowIndex, key, style }) => {
                      const game = games[columnCount * rowIndex + columnIndex];
                      return (
                        game && <GameTile key={key} game={game} style={style} />
                      );
                    }}
                    className=""
                    columnWidth={getColumnWidth}
                    columnCount={columnCount}
                    height={height}
                    overscanColumnCount={0}
                    overscanRowCount={5}
                    rowHeight={getColumnWidth}
                    rowCount={rowCount}
                    width={width}
                  />
                )}
              </ColumnSizer>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  );
};

export default GamesList;

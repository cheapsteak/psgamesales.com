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
    <WindowScroller>
      {({ height }) => (
        <AutoSizer onResize={dimensions => console.log(dimensions)}>
          {({ width }) => (
            <ColumnSizer width={width} columnCount={columnCount}>
              {({ adjustedWidth, getColumnWidth, registerChild }) => (
                <Grid
                  ref={registerChild}
                  cellRenderer={({ columnIndex, rowIndex, key, style }) => {
                    const game = games[columnCount * rowIndex + columnIndex];
                    return (
                      // @ts-ignore "Type '{}' is missing the following properties from type 'HTMLDivElement': align, addEventListener, removeEventListener, accessKey, and 236 more.ts(2322)"
                      game && <GameTile key={key} game={game} style={style} />
                    );
                  }}
                  className=""
                  columnWidth={getColumnWidth}
                  columnCount={columnCount}
                  height={height}
                  overscanColumnCount={0}
                  overscanRowCount={3}
                  rowHeight={getColumnWidth}
                  rowCount={rowCount}
                  width={adjustedWidth}
                />
              )}
            </ColumnSizer>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default GamesList;

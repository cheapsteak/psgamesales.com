import React, { useContext } from 'react';
import {
  Grid,
  ColumnSizer,
  AutoSizer,
  WindowScroller,
} from 'react-virtualized';
import GameTile from './GameTile';
import { StoreContext } from 'src/Store/StoreContext';
import LoadingTile from './LoadingTile';

const GamesList: React.FunctionComponent = () => {
  const {
    storeMetaData,
    gamesToShow,
    isLoading,
    hasPartialContent,
  } = useContext(StoreContext);

  const games = gamesToShow;
  const blocksToFillSpaceWith = 20;
  const totalItemsInStore = hasPartialContent
    ? storeMetaData.totalResults
    : blocksToFillSpaceWith;

  return (
    <WindowScroller>
      {({ height }) => (
        <AutoSizer>
          {({ width }) => {
            if (width === 0) {
              return null;
            }
            const columnWidth = 200;
            const columnCount = Math.ceil(width / columnWidth);
            const rowCount = Math.ceil(
              isLoading ? totalItemsInStore : games.length / columnCount,
            );
            return (
              <ColumnSizer width={width} columnCount={columnCount}>
                {({ adjustedWidth, getColumnWidth, registerChild }) => (
                  <Grid
                    ref={registerChild}
                    cellRenderer={({ columnIndex, rowIndex, key, style }) => {
                      const game = games[columnCount * rowIndex + columnIndex];

                      if (!game && isLoading) {
                        return (
                          <LoadingTile
                            key={key}
                            style={style}
                            columnIndex={columnIndex}
                            rowIndex={rowIndex}
                          />
                        );
                      }
                      return (
                        // @ts-ignore "Type '{}' is missing the following properties from type 'HTMLDivElement': align, addEventListener, removeEventListener, accessKey, and 236 more.ts(2322)"
                        game && (
                          <GameTile
                            key={`${key}:${game.id}`}
                            game={game}
                            style={style}
                            tooltipPosition={
                              columnIndex > columnCount - 3 ? 'right' : 'left'
                            }
                          />
                        )
                      );
                    }}
                    className=""
                    columnWidth={getColumnWidth}
                    columnCount={columnCount}
                    height={height}
                    overscanColumnCount={0}
                    overscanRowCount={10}
                    rowHeight={getColumnWidth}
                    rowCount={rowCount}
                    width={adjustedWidth}
                    autoContainerWidth
                  />
                )}
              </ColumnSizer>
            );
          }}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default GamesList;

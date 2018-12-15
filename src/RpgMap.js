import React, { useState, useCallback, useMemo } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import produce from "immer";
import RpgMapCell from "./RpgMapCell";
import { defaultMapItems, defaultPlayers } from "./data";
import { useZoom } from "./utils";

const isSameCell = (a, b) => a && b && a.x === b.x && a.y === b.y;
const getCellKey = cell => `${cell.x}-${cell.y}`;

const RpgMap = ({ width, height }) => {
  const [players, setPlayers] = useState(defaultPlayers);
  const [mapItems, setMapItems] = useState(defaultMapItems);
  const [selectedCell, setSelectedCell] = useState(null);
  const [zoom] = useZoom(4);

  const handleCellClick = useCallback(
    cell => {
      if (isSameCell(selectedCell, cell)) {
        setSelectedCell(null);
      } else if (players.some(p => isSameCell(p, cell))) {
        setSelectedCell(cell);
      } else if (selectedCell) {
        setSelectedCell(null);
        setPlayers(
          produce(draft => {
            const player = draft.find(p => isSameCell(p, selectedCell));
            player.x = cell.x;
            player.y = cell.y;
          })
        );
      }
    },
    [selectedCell, players]
  );

  const cellContents = useMemo(
    () => {
      const allItems = mapItems.concat(players);

      return allItems.reduce((rv, curr) => {
        const key = getCellKey(curr);

        if (!rv.has(key)) {
          rv.set(key, curr);
        } else {
          rv.set(key, { ...rv.get(key), ...curr });
        }

        return rv;
      }, new Map());
    },
    [mapItems, players]
  );

  const cellRenderer = ({ columnIndex: x, rowIndex: y, style }) => {
    const cell = { x, y };
    const key = getCellKey(cell);
    const item = cellContents.get(key) || {};
    const itemStyle = (item && item.style) || {};
    const selected = isSameCell(selectedCell, cell);

    return (
      <RpgMapCell
        onClick={() => handleCellClick(cell)}
        item={item}
        style={{ ...style, ...itemStyle }}
        selected={selected}
      />
    );
  };

  const zoomFactor = Math.sqrt(zoom);
  const cellSize = 50 * zoomFactor;
  const style = {
    lineHeight: `${cellSize}px`,
    fontSize: `${zoomFactor}rem`
  };

  return (
    <Grid
      columnCount={100}
      rowCount={100}
      columnWidth={cellSize}
      rowHeight={cellSize}
      width={width}
      height={height}
      style={style}
      className="Grid"
    >
      {cellRenderer}
    </Grid>
  );
};

export default RpgMap;

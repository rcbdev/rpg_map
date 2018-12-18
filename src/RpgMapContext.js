import React, { useState, useCallback, useMemo } from "react";
import produce from "immer";
import { defaultMapItems, defaultPlayers } from "./data";
import { isSameCell, getCellKey } from "./utils";

const RpgMapContext = React.createContext({
  players: null,
  mapItems: null,
  selectedCell: null,
  onCellClick: null,
  getCellContents: null
});

const mappedDefaultPlayers = defaultPlayers.map(p => ({
  ...p,
  text: p.name[0]
}));

const getDistanceIndicators = (selectedCell, moveDistance) => {
  const distanceIndicators = [];

  if (selectedCell) {
    const minX = Math.max(0, selectedCell.x - moveDistance);
    const maxX = selectedCell.x + moveDistance;
    const minY = Math.max(0, selectedCell.y - moveDistance);
    const maxY = selectedCell.y + moveDistance;

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const xOffset = Math.abs(selectedCell.x - x);
        const yOffset = Math.abs(selectedCell.y - y);
        const distance = Math.floor(
          Math.max(xOffset, yOffset) + Math.min(xOffset, yOffset) / 2
        );
        if (distance <= moveDistance) {
          distanceIndicators.push({
            x,
            y,
            text: distance.toString(),
            style: {
              backgroundColor: `hsl(100, 80%, ${100 - distance * 10}%)`,
              color: distance >= 8 ? "#fff" : "#000"
            }
          });
        }
      }
    }
  }

  return distanceIndicators;
};

const RpgMapContextProvider = ({ children }) => {
  const [players, setPlayers] = useState(mappedDefaultPlayers);
  const [mapItems, setMapItems] = useState(defaultMapItems);
  const [selectedCell, setSelectedCell] = useState(null);

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
      const distanceIndicators = getDistanceIndicators(selectedCell, 6);

      const allItems = distanceIndicators.concat(mapItems).concat(players);

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
    [mapItems, players, selectedCell]
  );

  const getCellContents = useCallback(
    cell => {
      const key = getCellKey(cell);
      const item = cellContents.get(key) || {};
      const itemStyle = (item && item.style) || {};
      const selected = isSameCell(selectedCell, cell);

      return {
        item,
        itemStyle,
        selected
      };
    },
    [cellContents, selectedCell]
  );

  return (
    <RpgMapContext.Provider
      value={{
        players,
        mapItems,
        selectedCell,
        onCellClick: handleCellClick,
        getCellContents
      }}
    >
      {children}
    </RpgMapContext.Provider>
  );
};

export { RpgMapContext, RpgMapContextProvider };

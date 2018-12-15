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

  const getCellContents = cell => {
    const key = getCellKey(cell);
    const item = cellContents.get(key) || {};
    const itemStyle = (item && item.style) || {};
    const selected = isSameCell(selectedCell, cell);

    return {
      item,
      itemStyle,
      selected
    };
  };

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

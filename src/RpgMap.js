import React, { useContext } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import RpgMapCell from "./RpgMapCell";
import { useZoom } from "./hooks";
import { RpgMapContext } from "./RpgMapContext";

const RpgMap = ({ width, height }) => {
  const { onCellClick, getCellContents } = useContext(RpgMapContext);

  const [zoom] = useZoom(4);

  const zoomFactor = Math.sqrt(zoom);
  const cellSize = 50 * zoomFactor;

  const cellRenderer = ({ columnIndex: x, rowIndex: y, style }) => {
    const cell = { x, y };
    const { item, itemStyle, selected } = getCellContents(cell);

    return (
      <RpgMapCell
        onClick={() => onCellClick(cell)}
        item={item}
        style={{ ...style, ...itemStyle }}
        selected={selected}
      />
    );
  };
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
      className="map"
    >
      {cellRenderer}
    </Grid>
  );
};

export default RpgMap;

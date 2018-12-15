import React, { useContext, useMemo } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import RpgMapCell from "./RpgMapCell";
import { useZoom } from "./hooks";
import { RpgMapContext } from "./RpgMapContext";

const RpgMap = ({ width, height }) => {
  const { onCellClick, getCellContents } = useContext(RpgMapContext);
  const itemData = useMemo(
    () => ({
      onCellClick,
      getCellContents
    }),
    [onCellClick, getCellContents]
  );

  const [zoom] = useZoom(2);
  const cellSize = Math.round(50 * zoom);

  const style = {
    lineHeight: `${cellSize}px`,
    fontSize: `${zoom}rem`
  };

  console.log(zoom);

  return (
    <Grid
      columnCount={100}
      rowCount={100}
      columnWidth={cellSize}
      rowHeight={cellSize}
      width={width}
      height={height}
      style={style}
      itemData={itemData}
      className="map"
    >
      {RpgMapCell}
    </Grid>
  );
};

export default RpgMap;

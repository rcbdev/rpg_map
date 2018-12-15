import React from "react";

const RpgMapCell = ({ columnIndex: x, rowIndex: y, style, data }) => {
  const cell = { x, y };
  const { onCellClick, getCellContents } = data;
  const { item, itemStyle, selected } = getCellContents(cell);

  return (
    <div
      style={{ ...style, ...itemStyle }}
      className={`cell ${selected ? "cell-selected" : ""}`}
      onClick={() => onCellClick(cell)}
    >
      {item && item.text}
    </div>
  );
};

export default RpgMapCell;

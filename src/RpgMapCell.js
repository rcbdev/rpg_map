import React from "react";

const RpgMapCell = ({ item, style, onClick, selected }) => (
  <div
    style={style}
    className={`cell ${selected ? "cell-selected" : ""}`}
    onClick={onClick}
  >
    {item && item.text}
  </div>
);

export default RpgMapCell;

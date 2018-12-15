import React from "react";

const MapCell = ({ item, style, onClick, selected }) => (
  <div
    style={style}
    className={`Cell ${selected ? "Cell-Selected" : ""}`}
    onClick={onClick}
  >
    {item && item.text}
  </div>
);

export default MapCell;

import React, { useContext } from "react";
import { RpgMapContext } from "./RpgMapContext";
import { getCellKey } from "./utils";

const Sidebar = () => {
  const { players } = useContext(RpgMapContext);

  return (
    <div className="sidebar">
      <ul>
        {players.map(p => (
          <li key={getCellKey(p)}>
            <strong>{p.name}</strong>{" "}
            <em>
              ({p.x}, {p.y})
            </em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

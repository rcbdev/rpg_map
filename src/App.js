import React from "react";
import RpgMap from "./RpgMap";
import "./App.css";
import { useWindowSize } from "./utils";

const App = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="App">
      <header className="App-header">
        <RpgMap width={width} height={height} />
      </header>
    </div>
  );
};

export default App;

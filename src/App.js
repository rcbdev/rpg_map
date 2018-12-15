import React from "react";
import Map from "./Map";
import "./App.css";
import { useWindowSize } from "./utils";

const App = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="App">
      <header className="App-header">
        <Map width={width} height={height} />
      </header>
    </div>
  );
};

export default App;

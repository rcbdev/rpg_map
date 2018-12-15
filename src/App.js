import React from "react";
import RpgMap from "./RpgMap";
import "./App.css";
import { useWindowSize } from "./utils";

const App = () => {
  const { width, height } = useWindowSize();

  return <RpgMap width={width} height={height} />;
};

export default App;

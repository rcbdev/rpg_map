import React from "react";
import ReactResizeDetector from "react-resize-detector";
import RpgMap from "./RpgMap";
import "./App.css";
import { RpgMapContextProvider } from "./RpgMapContext";
import Sidebar from "./Sidebar";

const MapWithAutoSizing = () => (
  <ReactResizeDetector handleHeight handleWidth>
    {(width = 0, height = 0) => <RpgMap width={width} height={height} />}
  </ReactResizeDetector>
);

const MapPlusSidebar = () => (
  <div className="page-with-sidebar">
    <div>
      <MapWithAutoSizing />
    </div>
    <Sidebar />
  </div>
);

const FullPageMap = () => (
  <div className="full-page">
    <MapWithAutoSizing />
  </div>
);

const App = () => {
  const ComponentToRender =
    window.location.pathname === "/map" ? FullPageMap : MapPlusSidebar;

  return (
    <RpgMapContextProvider>
      <ComponentToRender />
    </RpgMapContextProvider>
  );
};

export default App;

import { useEffect, useState } from "react";

const getWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const useKeyHandlers = (handlers, inputs) => {
  useEffect(() => {
    const handler = e => {
      const handle = handlers[e.key];
      handle && handle();
    };

    window.addEventListener("keypress", handler);

    return () => window.removeEventListener("keypress", handler);
  }, inputs);
};

const calculateNewZoom = (zoom, add) => Math.sqrt(Math.pow(zoom, 2) + add);

const useZoom = defaultZoom => {
  const [zoom, setZoom] = useState(defaultZoom, 2);

  useKeyHandlers(
    {
      "+": () => setZoom(z => Math.min(4, calculateNewZoom(z, 1))),
      "-": () => setZoom(z => Math.max(1, calculateNewZoom(z, -1)))
    },
    []
  );

  return [zoom];
};

export { useWindowSize, useKeyHandlers, useZoom };

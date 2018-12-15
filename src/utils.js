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

export { useWindowSize, useKeyHandlers };

import { useEffect, useState } from "react";

const useSyncedState = (defaultState, key) => {
  const [value, setValue] = useState(defaultState);

  const setValueInStorage = x => {
    const newValue = typeof x === "function"
      ? x(value)
      : x;
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  useEffect(() => {
    const handler = e => {
      if (e.key === key) {
        if (e.newValue) {
          setValue(JSON.parse(e.newValue));
        } else {
          setValue(defaultState);
        }
      }
    };

    const restored = localStorage.getItem(key);
    if (restored) {
      setValue(JSON.parse(restored));
    }

    window.addEventListener("storage", handler);

    return () => window.removeEventListener("storage", handler);
  }, []);

  return [value, setValueInStorage];
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

export { useKeyHandlers, useZoom, useSyncedState };

import { useEffect, useRef, useState } from 'react';

export const useInterval = (callback, delay) => {
    const savedCallback = useRef(callback);
  
    // Remember the latest callback if it changes.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      // Don't schedule if no delay is specified.
      // Note: 0 is a valid value for delay.
      if (!delay && delay !== 0) {
        return;
      }
  
      const id = setInterval(() => savedCallback.current(), delay);
  
      return () => clearInterval(id);
    }, [delay]);
};

export const usePersistedState = (storageKey, fallbackValue) => {

  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(storageKey);

    if (storedValue === null || typeof storedValue === 'undefined') {
      // console.log('returning fallback for' , storageKey , fallbackValue)
      return fallbackValue;
    }

    try {
      return JSON.parse(storedValue);
    } catch (e) {
      console.log('Error parsing stored value', e);
      return null;
    }
  });

  useEffect(() => {
    if (value !== null || typeof value !== 'undefined') {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }, [value, storageKey]);

  return [
    value,
    setValue,
    () => {
      setValue(fallbackValue);
    },
  ];
};
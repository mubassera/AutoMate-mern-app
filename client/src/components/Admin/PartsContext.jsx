// PartsContext.js
import React, { createContext, useState } from 'react';

export const PartsContext = createContext();

export const PartsProvider = ({ children }) => {
  const [parts, setParts] = useState([]);

  const addPart = (part) => {
    setParts((prevParts) => [...prevParts, part]);
  };

  return (
    <PartsContext.Provider value={{ parts, setParts, addPart }}>
      {children}
    </PartsContext.Provider>
  );
};

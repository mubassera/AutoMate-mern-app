import React, { createContext, useState, useEffect } from "react";
import { fetchAllParts } from "../../Api/adminPanel";
import axios from "axios";

// Create a context
export const PartsContext = createContext();

// PartsProvider component to wrap the app
export const PartsProvider = ({ children }) => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch parts from the backend
  const fetchParts = async () => {
    try {
      setLoading(true);
      const allParts = fetchAllParts();
      setParts(allParts);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch parts");
      setLoading(false);
    }
  };

  // Add a new part to the state (for local updates)
  const addPart = (newPart) => {
    setParts((prevParts) => [...prevParts, newPart]);
  };

  // Remove a part from the state (for local updates)
  const deletePart = (id) => {
    setParts((prevParts) => prevParts.filter((part) => part.id !== id));
  };

  // Fetch parts when the component mounts
  useEffect(() => {
    fetchParts();
  }, []);

  return (
    <PartsContext.Provider
      value={{ parts, setParts, addPart, deletePart, loading, error }}
    >
      {children}
    </PartsContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';

const LimitsContext = createContext();

export const useLimitsContext = () => useContext(LimitsContext);

export const LimitsProvider = ({ children }) => {
  const [limits, setLimits] = useState({
    reimbursementRate: 0,
    carRate: 0,
    receipts: [],
    reimbursementLimit: 0,
    distanceLimit: 0,
    receiptsLimit: 0,
  });

  const fetchLimits = async () => {
    try {
      const response = await fetch('http://localhost:8080/');
      if (response.ok) {
        const data = await response.json();
        setLimits(data);
      } else {
        console.error('Failed to fetch limits data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchLimits();
  }, []);

  return (
    <LimitsContext.Provider value={{ limits, setLimits }}>
      {children}
    </LimitsContext.Provider>
  );
};
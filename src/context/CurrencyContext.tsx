import React, { createContext, useContext, useState } from 'react';

type CurrencyContextType = {
  currentCurrency: string;
  changeCurrency: (currency: string) => void;
  formatPrice: (usd: number, azn: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState('USD');

  const changeCurrency = (currency: string) => {
    setCurrentCurrency(currency);
  };

  const formatPrice = (usd: number, azn: number) => {
    if (currentCurrency === 'USD') {
      return `$${usd}`;
    }
    return `₼${azn}`;
  };

  return (
    <CurrencyContext.Provider value={{ currentCurrency, changeCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
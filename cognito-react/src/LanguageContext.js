import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isMarathi, setIsMarathi] = useState(false);

  return (
    <LanguageContext.Provider value={{ isMarathi, setIsMarathi }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
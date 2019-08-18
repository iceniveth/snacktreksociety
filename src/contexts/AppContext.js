import React, { useState, createContext } from 'react';

const AppContext = createContext({});

const AppContextProvider = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const value = {
    isLoading,
    setIsLoading,
  };
  
  return <AppContext.Provider value={value}>{children}
  </AppContext.Provider>
};

const AppContextConsumer = AppContext.Consumer;

export {
  AppContext,
  AppContextProvider,
  AppContextConsumer,
};

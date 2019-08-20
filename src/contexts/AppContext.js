import React, { useState, createContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { allRoutes } from '../components/Routes/routes';

const AppContext = createContext({});

const AppContextProvider = withRouter(({
  children,
  history,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTopLevelRoute, setIsTopLevelRoute] = useState(false);
  
  useEffect(() => {
    const route = allRoutes[history.location.pathname];
    setIsTopLevelRoute(route.topLevelRoute);
  }, [history.location.pathname]);

  const value = {
    isLoading,
    isTopLevelRoute,
    startLoading() {
      setIsLoading(true);
    },
    stopLoading() {
      setIsLoading(false);
    },
  };

  return <AppContext.Provider value={value}>{children}
  </AppContext.Provider>
});

const AppContextConsumer = AppContext.Consumer;

export {
  AppContext,
  AppContextProvider,
  AppContextConsumer,
};

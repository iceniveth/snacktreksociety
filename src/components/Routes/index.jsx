import React from 'react';
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Games from "../../pages/Games";

function Routes() {
  const routes = [
    {
      path: "/",
      exact: true,
      component: Dashboard,
    },
    {
      path: "/games",
      exact: true,
      component: Games,
    },
  ];

  return (
    <Switch>
      {
        routes.map((r, i) => (
          <Route key={`route-${i}`} path={r.path} exact={r.exact} component={r.component} />
        ))
      }
    </Switch>
  );
}

export default Routes;

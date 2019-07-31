import React from 'react';
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

function Routes() {
  const routes = [
    {
      path: "/",
      exact: true,
      component: Dashboard,
    }
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

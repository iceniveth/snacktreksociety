import React, { lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Games from "../../pages/Games";

const Login = lazy(() => import('../../pages/Login'));

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
    {
      path: '/login',
      exact: true,
      component: Login,
    }
  ];

  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Switch>
        {
          routes.map((r, i) => (
            <Route key={`route-${i}`} path={r.path} exact={r.exact} component={r.component} />
          ))
        }
      </Switch>
    </Suspense>
  );
}

export default Routes;

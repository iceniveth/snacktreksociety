import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

function Routes() {
  const publicRoutes = [
    {
      path: '/login',
      exact: true,
      component: lazy(() => import('../../pages/Login')),
    },
    {
      path: '/404',
      exact: true,
      component: lazy(() => import('./PageNotFound')),
    }
  ];

  const privateRoutes = [
    {
      path: "/",
      exact: true,
      component: lazy(() => import('../../pages/Dashboard')),
    },
    {
      path: "/games",
      exact: true,
      component: lazy(() => import('../../pages/Games')),
    },
    {
      path: '/account',
      exact: true,
      component: lazy(() => import('../../pages/Account')),
    }
  ];

  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Switch>
        {
          privateRoutes.map((r, i) => (
            <PrivateRoute
              key={`private-route-${i}`}  
              {...r}
            />
          ))
        }
        {
          publicRoutes.map((r,i ) => (
            <Route
              key={`public-route-${i}`}
              {...r}
            />
          ))
        }
        <Redirect from='*' to='/404' />
      </Switch>
    </Suspense>
  );
}

export default Routes;

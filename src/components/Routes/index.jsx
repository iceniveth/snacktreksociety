import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

const PageNotFound = lazy(() => import('./PageNotFound'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Games = lazy(() => import('../../pages/Games'));
const Login = lazy(() => import('../../pages/Login'));

function Routes() {
  const publicRoutes = [
    {
      path: '/login',
      exact: true,
      component: Login,
    },
    {
      path: '/404',
      exact: true,
      component: PageNotFound,
    }
  ];

  const privateRoutes = [
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

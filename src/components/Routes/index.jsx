import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from './PageNotFound';

const PageNotFound = lazy(() => import('./PageNotFound'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Games = lazy(() => import('../../pages/Games'));
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
            <Route key={`route-${i}`} {...r} />
          ))
        }
        <Route path="/404" exact={true} component={PageNotFound} />
        <Redirect from='*' to='/404' />
      </Switch>
    </Suspense>
  );
}

export default Routes;

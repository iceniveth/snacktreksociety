import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { privateRoutes, publicRoutes } from './routes';

function Routes() {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Switch>
        {
          privateRoutes
            .map(r => (
              <PrivateRoute
                key={r.path}  
                {...r}
              />
            ))
        }
        {
          publicRoutes
            .map(r => (
              <Route
                key={r.path}
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

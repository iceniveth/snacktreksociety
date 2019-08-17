import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={
        props => authContext.isSignedIn
          ? <Component {...props} />
          : (
            <Redirect
              to="/login"
            />
          )
      }
    ></Route>
  );
};

export default PrivateRoute;

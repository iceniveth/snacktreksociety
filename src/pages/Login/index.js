import React, { useEffect } from 'react';
import {
  Container,
} from '@material-ui/core';
import { openFirebaseUI } from '../../api/firebase';

const Login = () => {
  useEffect(() => {
    openFirebaseUI('#firebaseui-auth-container');
  }, []);

  return (
    <Container maxWidth='xs'>
      <div id="firebaseui-auth-container" />
    </Container>
  )
}

export default Login;

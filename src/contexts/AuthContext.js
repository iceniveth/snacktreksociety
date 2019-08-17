import React, { useState, useEffect } from 'react';
import { auth } from '../api/firebase';

const AuthContext = React.createContext({});

const KEYS = {
  EMAILFORSIGNIN: 'emailForSignIn',
}

const AuthContextProvider = props => {
  const userSession = JSON.parse(window.sessionStorage.getItem('user'))
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState(userSession);
  const [isSignedIn, setIsSignedIn] = useState(userSession != null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
        } = user;

        const signedInUser = {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
        };
        setUser(signedInUser);
        window.sessionStorage.setItem('user', JSON.stringify(signedInUser));
      } else {
        window.sessionStorage.removeItem('user');
      }
      setIsSignedIn(user != null);
    });

  }, []);

  const value = {
    isLoggingIn,
    // error,
    user,
    isSignedIn,
    async sendSignInLinkToEmail(email) {
      // try {
      //   setIsSendingEmailLink(true);
      //   const actionCodeSettings = {
      //     url: `${process.env.REACT_APP_URL}/login`,
      //     handleCodeInApp: true,
      //   };
      //   await auth.sendSignInLinkToEmail(email, actionCodeSettings);
      //   setIsEmailSent(true);
      //   window.localStorage.setItem(KEYS.EMAILFORSIGNIN, email);
      // } catch (err) {
      //   setError(err.message);
      // } finally {
      //   setIsSendingEmailLink(true);
      // }
    },
    async isSignInWithEmailLink(url) {
      if (auth.isSignInWithEmailLink(url)) {
        try {
          setIsLoggingIn(true);
          let email = window.localStorage.getItem(KEYS.EMAILFORSIGNIN);

          if (!email) {
            email = window.prompt('Please provide your email for confirmation');
          }

          const result = await auth.signInWithEmailLink(email, url);
          window.localStorage.removeItem(KEYS.EMAILFORSIGNIN);
          console.log(result);
        } finally {
          setIsLoggingIn(false);
        }
      }
    },
    signOut() {
      auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider> 
};

const AuthContextConsumer = AuthContext.Consumer;

export {
  AuthContext,
  AuthContextProvider,
  AuthContextConsumer,
};

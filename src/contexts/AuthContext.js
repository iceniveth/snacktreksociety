import React, { useState, useEffect } from 'react';
import { auth } from '../api/firebase';

const AuthContext = React.createContext({});

const KEYS = {
  EMAILFORSIGNIN: 'emailForSignIn',
}

const AuthContextProvider = props => {
  const [isSendingEmailLink, setIsSendingEmailLink] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(function resetErrorStateWhenLoading() {
    if (
      isSendingEmailLink
      || isLoggingIn
      || isSigningOut
    ) {
      setError(null);
    }
  }, [
    isSendingEmailLink,
    isLoggingIn,
    isSigningOut,
  ])

  const value = {
    isSendingEmailLink,
    isLoggingIn,
    isEmailSent,
    error,
    user,
    async sendSignInLinkToEmail(email) {
      try {
        setIsSendingEmailLink(true);
        const actionCodeSettings = {
          url: `${process.env.REACT_APP_URL}/login`,
          handleCodeInApp: true,
        };
        await auth.sendSignInLinkToEmail(email, actionCodeSettings);
        setIsEmailSent(true);
        window.localStorage.setItem(KEYS.EMAILFORSIGNIN, email);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsSendingEmailLink(true);
      }
    },
    async isSignInWithEmailLink(url) {
      if (auth.isSignInWithEmailLink(url)) {
        console.log('signinwithemail');
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
    async signOut() {
      try {
        setIsSigningOut(true);
        await auth.signOut();
      } finally {
        setIsSigningOut(false);
      }
    }
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider> 
};

const AuthContextConsumer = AuthContext.Consumer;

export {
  AuthContext,
  AuthContextProvider,
  AuthContextConsumer,
};

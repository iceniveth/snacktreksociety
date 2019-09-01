import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../api/firebase';

const AuthContext = React.createContext({});

const KEYS = {
  EMAILFORSIGNIN: 'emailForSignIn',
};

const AuthContextProvider = props => {
  const userSession = JSON.parse(window.localStorage.getItem('user'));
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
        window.localStorage.setItem('user', JSON.stringify(signedInUser));

        // This is a temporary solution for updating displayName from Auth to Firestore. Due to cloud functions cold start, the `dbUserCreated` function when triggered, causes an error thus resulting to have users with a display name of null. Remove this IIFE when cloud function has resolve the issue. https://github.com/firebase/firebase-functions/issues/536
        // (function updateUserDisplayNameIfMissing() {
        //   db.users
        //     .doc(uid)
        //     .get()
        //     .then(doc => {
        //       const data = doc.data();
        //       const userDisplayName = data.displayName;
        //       console.log(
        //         `user display name from firestore: ${userDisplayName}`
        //       );
        //       if (userDisplayName == null) {
        //         db.users
        //           .doc(uid)
        //           .set({ displayName }, { merge: true })
        //           .then(_ => console.log('display name updated.'));
        //       }
        //     });
        // })();
      } else {
        window.localStorage.removeItem('user');
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
    async updateAccount({ displayName, photoURL }) {
      const updatedUser = {
        ...user,
        displayName,
        photoURL,
      };
      await auth.currentUser.updateProfile({
        displayName,
        photoURL,
      });
      await db.users.doc(user.uid).update(updatedUser);
      setUser(updatedUser);
      window.localStorage.setItem('user', JSON.stringify(updatedUser));
    },
    signOut() {
      auth.signOut();
    },
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

const AuthContextConsumer = AuthContext.Consumer;

const useAuthContext = () => useContext(AuthContext);

export {
  AuthContext,
  AuthContextProvider,
  AuthContextConsumer,
  useAuthContext,
};

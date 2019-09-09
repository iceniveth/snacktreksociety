import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);

const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  signInSuccessUrl: '/',
};

const openFirebaseUI = container => ui.start(container, uiConfig);

const firestore = firebase.firestore();
const db = {
  users: firestore.collection('users'),
  games: firestore.collection('games'),
  histories: firestore.collectionGroup('histories'),
  attendances: firestore.collection('attendances'),
};

export { auth, db, openFirebaseUI };

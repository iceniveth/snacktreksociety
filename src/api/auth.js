import { auth } from './firebase';

const sendSignInLinkToEmail = email => {
  const actionCodeSettings = {
    url: process.env.REACT_APP_URL,
    handleCodeInApp: true,
  };
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
}

const onAuthStateChanged = callback => auth.onAuthStateChanged(callback)

export {
  sendSignInLinkToEmail,
  onAuthStateChanged,
};

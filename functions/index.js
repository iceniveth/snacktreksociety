const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.authUserCreated = functions.auth.user().onCreate((user) => {
  const {
    displayName,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
    uid,
  } = user;

  return firestore
    .collection('users')
    .doc(uid)
    .set({
      displayName,
      email,
      emailVerified,
      phoneNumber,
      photoURL,
    });
});

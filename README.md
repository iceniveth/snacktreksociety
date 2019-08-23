# SNACKTREK

[![pipeline status](https://gitlab.com/ken11zer01/snacktreksociety/badges/master/pipeline.svg)](https://gitlab.com/ken11zer01/snacktreksociety/commits/master)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup
* Install firebase tools `npm install -g firebase-tools` or refer to their [docs](https://github.com/firebase/firebase-tools).
* Create `env.bat` file
```bash
set REACT_APP_API_KEY=
set REACT_APP_AUTH_DOMAIN=
set REACT_APP_DATABASE_URL=
set REACT_APP_PROJECT_ID=
set REACT_APP_STORAGE_BUCKET=
set REACT_APP_MESSAGING_SENDER_ID=
set REACT_APP_APP_ID=
set PORT= #Default port is 3000 if not specified
```
> You could get these keys from your web app.<br />
> See firebase docs [here](https://support.google.com/firebase/answer/7015592).

* Open **Command Prompt** and then run batch file `env.bat` 
* Login your firebase account `firebase login`
* Create a `.firebaserc` file
```bash
{
  {
    "default": "replace_this_text_with_project_name"
  }
}
```
* Install packages `npm install`

## Run
* Set environment variables `env.bat`
* Run project `npm run start`

## Deploy
### Application
* Set environment variables `env.bat`
* Install packages `npm install`
* Build project `npm run build`
* Deploy static site to firebase hosting `firebase deploy --only hosting`

### Functions
* Install cloud function packages `cd functions && npm install && cd ..`
* Deploy functions `firebase deploy --only functions`

### Firestore Security Rules
* Deploy security rules: `firebase deploy --only firestore:rules`
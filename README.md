# Snacktrek Society [![Build Status](https://dev.azure.com/iceniveth/snacktrek/_apis/build/status/iceniveth.snacktreksociety?branchName=release)](https://dev.azure.com/iceniveth/snacktrek/_build/latest?definitionId=3&branchName=release)
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
<br />or
* Deploy specific function `firebase deploy --only functions:functionName`

### Firestore Security Rules
* Deploy security rules: `firebase deploy --only firestore:rules`

## Firestore Indexes
Whenever you update the firestore indexes from firebase console, please update the **firestore.indexes.json** file.<br />
* Run the command `firestore:indexes`
* Copy the output of the command to **firestore.indexes.json**
* Commit those changes
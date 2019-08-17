# SNACKTREK

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
```
* Open **Command Prompt** and then run batch file `env.bat` 
* Login your firebase account `firebase login`
* Create a `.firebaserc` file
```bash
{
  "projects": {
    "default": "your_project_name_here"
  }
}
```
* Install packages `npm install`

## Run
* Run project `npm run start`

## Deploy
### Application
* Set environment variables `env.bat`
* Build project `npm run build`
* Deploy static site to firebase hosting `firebase deploy --only hosting`

### Functions
* Deploy functions `firebase deploy --only functions`
import React from 'react';
import AppHeader from './components/AppHeader';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './components/Routes';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <AppHeader />
        <div style={{ padding: 30 }}>
          <Routes />
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

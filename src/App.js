import React from 'react';
import AppHeader from './components/AppHeader';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './components/Routes';

function App() {
  return (
    <Router>
      <AppHeader />
      <div style={{ padding: 30 }}>
        <Routes />
      </div>
    </Router>
  );
}

export default App;

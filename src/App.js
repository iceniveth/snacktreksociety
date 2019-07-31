import React from 'react';
import Header from './components/AppHeader';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './components/Routes';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}>
        <Routes />
      </div>
    </Router>
  );
}

export default App;

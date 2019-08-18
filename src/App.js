import React from 'react';
import AppHeader from './components/AppHeader';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import Routes from './components/Routes';
import { AuthContextProvider } from './contexts/AuthContext';
import { AppContextProvider } from './contexts/AppContext';
import theme from './theme';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <AppContextProvider>
            <AppHeader />
            <div style={{ padding: 30 }}>
              <Routes />
            </div>
          </AppContextProvider>
        </ThemeProvider>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

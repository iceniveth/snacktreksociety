import React from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import './App.css';

function App() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h6">
          Team Prano
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default App;

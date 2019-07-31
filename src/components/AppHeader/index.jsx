import React, { useState } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from '@material-ui/core';

const Header = () => {
  const [drawerState, setDrawerState] = useState(false);
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerState(true)}>
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6">
            Team Prano
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerState} onClose={() => setDrawerState(false)}>
        <div
          style={{ width: 250 }}
          onClick={() => setDrawerState(false)}
          onKeyDown={() => setDrawerState(false)}
        >
          <List>
            <ListItem button key="Dashboard">
              <ListItemIcon><Icon>dashboard</Icon></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button key="Attendance">
              <ListItemIcon><Icon>date_range</Icon></ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItem>
            <ListItem button key="Games">
              <ListItemIcon><Icon>stay_current_portrait</Icon></ListItemIcon>
              <ListItemText primary="Games" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default Header;

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const authContext = useContext(AuthContext);
  const [drawerState, setDrawerState] = useState(false);
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          {
            authContext.isSignedIn && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerState(true)}
              >
                <Icon>menu</Icon>
              </IconButton>
            )
          }
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Snacktrek
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
            <ListItem button key="Dashboard" component={Link} to="/">
              <ListItemIcon><Icon>dashboard</Icon></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button key="Attendance">
              <ListItemIcon><Icon>date_range</Icon></ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItem>
            <ListItem button key="Games" component={Link} to="/games">
              <ListItemIcon><Icon>stay_current_portrait</Icon></ListItemIcon>
              <ListItemText primary="Games" />
            </ListItem>
            <ListItem
              key="SignOut"
              button
              onClick={authContext.signOut}
            >
              <ListItemIcon><Icon>highlight_off</Icon></ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default Header;

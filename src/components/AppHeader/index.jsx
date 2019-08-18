import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Typography,
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Drawer,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from '@material-ui/core';
import { AuthContext } from '../../contexts/AuthContext';
import { AppContext } from '../../contexts/AppContext';

const Header = ({
  history,
}) => {
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);
  const { isSignedIn } = authContext;
  const [drawerState, setDrawerState] = useState(false);
  const handleDisplayNameClick = () => history.push('/account');
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          {
            isSignedIn && (
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
          {
            isSignedIn && (
              <Button
                color="inherit"
                onClick={handleDisplayNameClick}
              >
                <Icon>account_circle</Icon>
                &nbsp;&nbsp;
                <Typography
                  variant="h6"
                  noWrap
                  style={{
                    maxWidth: '300px',
                  }}
                >
                  {authContext.user.displayName}
                </Typography>
                <span
                  style={{ color: 'white' }}
                ></span>
              </Button>
            )
          }
          {
            isSignedIn && (
              <IconButton
                color="inherit"
              >
                <Icon>notifications</Icon>
              </IconButton>
            )
          }
        </Toolbar>
      </AppBar>
      {
        appContext.isLoading && (
          <LinearProgress color="secondary" />
        )
      }
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

export default withRouter(Header);

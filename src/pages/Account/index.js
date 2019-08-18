import React, { useContext, Fragment } from 'react';
import {
  Avatar,
  Fab,
  Grid,
  Icon,
  Tooltip,
  Typography,
  Chip,
} from '@material-ui/core';
import {
  red
} from '@material-ui/core/colors';
import { useTheme } from '@material-ui/styles';
import { AuthContext } from '../../contexts/AuthContext';

const Account = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const theme = useTheme();

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Avatar>
            {
              authContext.user.displayName
              && authContext.user.displayName.length > 0
              && authContext.user.displayName[0].toUpperCase()
            }
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{user.displayName}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            {user.email}&nbsp;
            {
              !user.emailVerified && (
                <Chip
                  style={{
                    color: red[500],
                  }}
                  label="Not Verified"
                />
              )
            }
          </Typography>
        </Grid>
        
        <Grid item>
          <Typography variant="subtitle1">
            {user.phoneNumber}
          </Typography>
        </Grid>
      </Grid>
      <Tooltip title="Edit Profile" placement="left">
        <Fab
          color="secondary"
          style={{
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
          }}
        >
          <Icon>edit</Icon>
        </Fab>
      </Tooltip>
    </Fragment>
  );
}

export default Account;

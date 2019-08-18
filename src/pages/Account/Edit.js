import React, { useState, useContext } from 'react';
import {
  Button,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  grey
} from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { AppContext } from '../../contexts/AppContext';

const AccountEdit = ({
  history,
}) => {
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);
  const { user } = authContext;
  
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const handleDisplayNameChange = e => setDisplayName(e.target.value);

  const handleSaveClick = async () => {
    try {
      appContext.setIsLoading(true);
      await authContext.updateAccount({
        displayName,
        photoURL: null,
      });
      history.goBack();
    } finally {
      appContext.setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          <Typography variant="caption" style={{ color: grey[500] }}>
            Email
          </Typography>
          <Typography variant="body1">
            {user.email}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Display Name"
            value={displayName}
            fullWidth
            onChange={handleDisplayNameChange}
          />
        </Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleSaveClick}
          >
            <Icon fontSize="small">save</Icon>&nbsp;
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default withRouter(AccountEdit);

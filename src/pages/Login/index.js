import React, { useState, useContext } from 'react';
import {
  Card,
  TextField,
  Button,
  Grid,
  FormControl,
  Container,
  Paper,
  Icon,
} from '@material-ui/core';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const handleEmailChange = e => setEmail(e.target.value);
  const authContext = useContext(AuthContext);
  const handleSendEmailLink = async () => {
    await authContext.sendSignInLinkToEmail(email);
  }

  return (
    <Container maxWidth='xs'>
      <br />
      <Card style={{ padding: '15px' }}>
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <Grid
          container
          direction="row-reverse"
          justify="flex-start"
          alignItems="flex-start"
        >
          {
            authContext.isEmailSent ?
            (
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={() => authContext.toggleEmailSent()}
              >Login
              </Button>
            ) : (
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleSendEmailLink}
              >Send Sign In Link
              </Button>
            )
          }
        </Grid>
      </Card>
      <Paper
        style={{
          margin: '10px 0px', 
          padding: '15px',
          visibility: authContext.error ? 'visible' : 'hidden'
        }}
      >
        <span
          style={{ color: 'red' }}
        >
          <Icon>info</Icon>
          {authContext.error}
        </span>
      </Paper>
      
    </Container>
  )
}

export default Login;

import React, { useState } from 'react';
import {
  Card,
  TextField,
  Button,
  Grid,
  FormControl,
  Container,
} from '@material-ui/core';
import { sendSignInLinkToEmail } from '../../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const handleEmailChange = e => setEmail(e.target.value);

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
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => sendSignInLinkToEmail(email)}
          >Login
          </Button>
        </Grid>
      </Card>
      
    </Container>
  )
}

export default Login;

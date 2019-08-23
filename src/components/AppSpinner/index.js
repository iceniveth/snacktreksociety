import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

const AppSpinner = () => (
  <Grid container direction="row" justify="center" alignItems="center">
    <CircularProgress color="secondary" />
  </Grid>
);

export default AppSpinner;

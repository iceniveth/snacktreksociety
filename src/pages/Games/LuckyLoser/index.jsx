import React, { useContext } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Randomizer from './Randomizer';
import GameTabs from './Tabs';
import PeopleList from './PeopleList';
import { LuckyLoserContextProvider, LuckyLoserContext } from '../../../contexts/LuckyLoserContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 500,
    // width: 100,
    textAlign: 'center',
  },
}));

const LuckyLoser = () => {
  const {
    curTab,
  } = useContext(LuckyLoserContext);
  const classes = useStyles();

  const RightPane = () => {
    let returnValue;
    if (curTab === 0) {
      returnValue = (
        <PeopleList />
      );
    } else if (curTab === 1) {
      returnValue = <h1>History</h1>;
    } else {
      returnValue = <h1>Settings</h1>;
    }
    return returnValue;
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Randomizer />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <GameTabs />
          <RightPane />
        </Paper>
      </Grid>
    </Grid>
  );
}

const LuckyLoserWithProvider = () => (
  <LuckyLoserContextProvider>
    <LuckyLoser />
  </LuckyLoserContextProvider>
)

export default LuckyLoserWithProvider;

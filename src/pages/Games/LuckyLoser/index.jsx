import React, { useContext } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Randomizer from './Randomizer';
import GameTabs from './Tabs';
import PeopleList from './PeopleList';
import History from './History';
import { LuckyLoserContextProvider, LuckyLoserContext } from '../../../contexts/LuckyLoserContext';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 600,
    textAlign: 'center',
    overflow: 'auto',
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
      returnValue = <History />;
    } else {
      returnValue = <h1>Settings</h1>;
    }
    return returnValue;
  }

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} md={10}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <Randomizer />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <GameTabs />
              <RightPane />
            </Paper>
          </Grid>
        </Grid>
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

import React, { useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import { LuckyLoserContext } from '../../../contexts/LuckyLoserContext';


const Randomizer = () => {
  const { playGame, gameStarted, gameData } = useContext(LuckyLoserContext);

  return (
    <React.Fragment>
      <h1 style={{ margin: 0 }}>The Lucky Loser!</h1>
      <Grid
        container
        align="center"
        justify="center"
        direction="column"
        style={{ height: 400 }}
      >
        <h1>{gameData}</h1>
        {
          !gameStarted && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => playGame()}
              >
                Start
              </Button>
            </Grid>
          )
        }
      </Grid>
    </React.Fragment>
  );
}

export default Randomizer;

import React, { useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import { LuckyLoserContext } from '../../../contexts/LuckyLoserContext';


const Randomizer = () => {
  const {
    playGame, gameStarted, gameData, gameFinished, resetGame,
  } = useContext(LuckyLoserContext);

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
        <h1
          style={{
            fontSize: '100px',
          }}
        >
          {gameData}
        </h1>
        {
          !gameStarted && !gameFinished && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => playGame()}
              >
                Start Game
              </Button>
            </Grid>
          )
        }
        {
          gameFinished && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => resetGame()}
              >
                Reset
              </Button>
            </Grid>
          )
        }
      </Grid>
    </React.Fragment>
  );
}

export default Randomizer;

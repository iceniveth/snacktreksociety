import React, { useState, useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import { LuckyLoserContext } from '../../../contexts/LuckyLoserContext';


const Randomizer = () => {
  const {
    checkedPeople: people, setCheckedPeople: setPeople, gameStarted, setGameStarted,
  } = useContext(LuckyLoserContext);
  const [gameData, setGameData] = useState('');

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const startGame = async () => {
    // const newPeople = await shuffle(people);
    // await setPeople(newPeople);
    // await setGameData('')
    setGameStarted(true);
    await sleep(1000);
    people[0].count = 1;
    console.log(people[0]);
    // while (!people.find(p => p.count >= 3)) {
    //   const randomInt = Math.floor(Math.random() * people.length);
    //   await sleep(3000);
    //   setGameData(people[randomInt].name);
    //   people[randomInt].count += 1;
    //   console.log(people[randomInt]);
    //   setPeople(people);
    // }
  }

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
        {
          !gameStarted && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => startGame()}
              >
                Start
              </Button>
            </Grid>
          )
        }
        <h1>{gameData}</h1>
      </Grid>
    </React.Fragment>
  );
}

export default Randomizer;

import React from 'react';
import {
  Grid, Card, CardHeader,
  CardMedia, CardContent, Typography,
} from '@material-ui/core';

const Game = ({data, history}) => (
  <Card onClick={() => history.push(`/games/${data.path}`)} style={{ cursor: 'pointer' }}>
    <CardHeader
      title={data.name}
      subheader="August 1, 2019"
    />
    <CardMedia
      image={data.image}
      style={{ height: '20vh' }}
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {data.description}
      </Typography>
    </CardContent>
  </Card>
);

const Games = ({ history }) => {
  const games = [
    {
      id: 1,
      name: 'Lucky Loser',
      description: `One lucky person gets to be the Lucky Loser every day.
        This game uses the True Random api by random.org which uses atmospheric noise to mimic randomness.`,
      image: 'https://picsum.photos/200',
      path: 'lucky-loser',
    },
    {
      id: 2,
      name: 'Lunch Time',
      description: `Can't decide where to have lunch?
      Well, worry not! Lunch Time chooses the place for you!
      This game uses the True Random api by random.org which uses atmospheric noise to mimic randomness.`,
      image: 'https://picsum.photos/200',
      path: 'lunch-time',
    },
  ];
  return (
    <Grid container spacing={2}>
      {games.map((value, i) => (
        <Grid key={`game-${i}`} item xs={6} md={3}>
          <Game data={value} history={history} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Games;
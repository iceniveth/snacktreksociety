import React from 'react';
import {
  Grid, Card, CardHeader, Avatar,
  CardMedia, CardContent, Typography,
} from '@material-ui/core';

const Game = () => (
  <Card>
    <CardHeader
      avatar={
        <Avatar aria-label="Recipe">
          R
        </Avatar>
      }
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
    />
    <CardMedia
      image="https://picsum.photos/200"
      style={{ height: '20vh' }}
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        This impressive paella is a perfect party dish and a fun meal to cook together with your
        guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </Typography>
    </CardContent>
  </Card>
);

const Games = () => {
  return (
    <Grid container spacing={2}>
      {[1,1, 1].map(value => (
        <Grid key={value} item xs={6} md={3}>
          <Game />
        </Grid>
      ))}
    </Grid>
  );
}

export default Games;
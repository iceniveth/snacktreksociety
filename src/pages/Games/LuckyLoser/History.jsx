import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Hidden,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { LuckyLoserContext } from '../../../contexts/LuckyLoserContext';
import { timestampFormatter } from '../../../utils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

export default function DenseTable() {
  const { fetchHistory, clearHistory, history } = useContext(LuckyLoserContext);
  const classes = useStyles();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const init = async () => {
      await fetchHistory();
      if (isSubscribed) {
        setReady(true);
      }
    };

    init();
    return () => {
      clearHistory();
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ready ? (
    <React.Fragment>
      <Hidden smDown>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {timestampFormatter(row.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Hidden>
      <Hidden mdUp>
        <List dense>
          {history.map(row => (
            <ListItem key={`history-${row.name}`}>
              <ListItemText
                primary={row.name}
                secondary={timestampFormatter(row.date)}
              />
            </ListItem>
          ))}
        </List>
      </Hidden>
    </React.Fragment>
  ) : (
    <CircularProgress style={{ margin: 30 }} />
  );
}

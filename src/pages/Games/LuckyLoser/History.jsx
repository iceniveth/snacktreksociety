import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Hidden,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { LuckyLoserContext } from "../../../contexts/LuckyLoserContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    // marginTop: theme.spacing(3),
    // width: '100%',
    // overflowX: 'auto',
    // marginBottom: theme.spacing(2),
  },
  table: {
    // minWidth: 650,
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt"),
  createData("Ice cream sandwich"),
  createData("Eclair"),
  createData("Cupcake"),
  createData("Gingerbread")
];

export default function DenseTable() {
  const { fetchHistory } = useContext(LuckyLoserContext);
  const classes = useStyles();

  useEffect(() => {
    console.log("test");
    fetchHistory();
  });

  return (
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
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Hidden>
      <Hidden mdUp>
        <List dense>
          <ListItem>
            <ListItemText primary="JoMari" secondary="Jan 26, 1997" />
          </ListItem>
        </List>
      </Hidden>
    </React.Fragment>
  );
}

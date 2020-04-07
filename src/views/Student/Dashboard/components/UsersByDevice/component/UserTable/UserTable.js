import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  }
}));

function createData(name, calories, idx, carbs, protein) {
  return { name, calories, idx, carbs, protein };
}

export default function SimpleTable() {
  const classes = useStyles();

  const rows = [
    createData(<Avatar className={classes.orange}>N</Avatar>, '나은지', 0),
    createData(<Avatar className={classes.orange}>Y</Avatar>, '윤지원', 1),
    createData(<Avatar className={classes.deepPurple}>L</Avatar>, '이재용', 2),
    createData(<Avatar className={classes.deepPurple}>Y</Avatar>, '윤재원', 3),
    createData(<Avatar className={classes.deepPurple}>L</Avatar>, '이재용', 4),
    createData(<Avatar className={classes.orange}>Y</Avatar>, '윤재원', 5),
    createData(<Avatar className={classes.deepPurple}>Y</Avatar>, '윤재원', 6),
    createData(<Avatar className={classes.deepPurple}>L</Avatar>, '이재용', 7)
  ];
  return (
    <Table
      aria-label="simple table"
      className={classes.table}
    >
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={row.idx}>
            <TableCell align="center">{row.name}</TableCell>
            <TableCell align="left">{row.calories}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

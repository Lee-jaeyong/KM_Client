import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6)
  },
  table: {
    height: 130
  },
  titleCell: {
    textAlign: 'center',
    backgroundColor: '#EBF7FF',
    width: '10%'
  },
  contentCell: {
    textAlign: 'center',
    width: '40%'
  }
}));

const StuReportInfo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table
          aria-label="a dense table"
          className={classes.table}
          size="small"
        >
          <TableBody>
            <TableRow>
              <TableCell className={classes.titleCell}>수업명</TableCell>
              <TableCell className={classes.contentCell}>Spring 기초</TableCell>
              <TableCell className={classes.titleCell}>담당 교수</TableCell>
              <TableCell className={classes.contentCell}>박남일</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.titleCell}>시작 날짜</TableCell>
              <TableCell className={classes.contentCell}>2020-03-01</TableCell>
              <TableCell className={classes.titleCell}>마감 날짜</TableCell>
              <TableCell className={classes.contentCell}>2020-03-08</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.titleCell}>참고 파일</TableCell>
              <TableCell className={classes.contentCell}>ssdfsdf</TableCell>
              <TableCell className={classes.titleCell}>참고 이미지</TableCell>
              <TableCell className={classes.contentCell}>dsfsdfsf</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StuReportInfo;

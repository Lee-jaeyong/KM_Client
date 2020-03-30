import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
  const dispatch = useDispatch();
  const classes = useStyles();

  const showMessageBox = (title, level, visible) => {
    let message = {
      content: title,
      level: level,
      visible: visible
    };
    dispatch(SHOW_MESSAGE_ACTION.show_message(message));
  };

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
      <br />
      <TextField
        component={Paper}
        fullWidth
        id="outlined-multiline-static"
        label="과제 내용"
        multiline
        onKeyUp={() => showMessageBox('읽기 전용입니다.', 'error', true)}
        rows="15"
        value="이번주 과제는 어.. 컴퓨터의 작동원리를 조사하는것입니다."
        variant="outlined"
      />
      <br />
      <br />
      <br />
      <Grid container>
        <Grid xs={5} />
        <Grid
          sm={2}
          xs={12}
        >
          <Button
            color="primary"
            fullWidth
            onClick={() => {
              alert('과제제출하는화면 기기');
            }}
            variant="contained"
          >
            과제 제출하기
          </Button>
        </Grid>
        <Grid xs={5} />
      </Grid>
    </div>
  );
};

export default StuReportInfo;

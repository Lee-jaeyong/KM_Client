import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';

import Editor from 'tui-editor'; /* ES6 */
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import CustomTable from '@common/component/CustomTable';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  requireFont: {
    color: 'red'
  }
}));

function createButton(iconClassName) {
  const button = document.createElement('button');

  button.className = 'custom-button';
  button.innerHTML = `<i class="${iconClassName}"></i>`;

  return button;
}

const ClassInfo = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    submitCheck: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} xl={8} xs={8}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan="4" align="center">
                    <h2>* 수업 정보</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <h2>수업명</h2>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    <TextField fullWidth variant="outlined" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>수업 시작일</h2>
                  </TableCell>
                  <TableCell align="left">
                    <TextField fullWidth variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <h2>수업 종료일</h2>
                  </TableCell>
                  <TableCell align="left">
                    <TextField fullWidth variant="outlined" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>강의계획서</h2>
                    <br />
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    <a href="#">자바스크립트 강의 계획서.xlsx</a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>수업 내용</h2>
                    <br />
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="2">
                    <Button variant="contained" color="primary" fullWidth>
                      수업 수정
                    </Button>
                  </TableCell>
                  <TableCell colSpan="2">
                    <Button variant="contained" color="secondary" fullWidth>
                      수업 삭제
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={4} md={4} xl={4} xs={4}>
          <TableContainer component={Paper}>
            <CustomTable />
          </TableContainer>
        </Grid>
      </Grid>
      <br/>
      <Grid item lg={12} md={12} xl={12} xs={12}>
          <TableContainer component={Paper}>
            <CustomTable />
          </TableContainer>
        </Grid>
    </div>
  );
};

export default ClassInfo;

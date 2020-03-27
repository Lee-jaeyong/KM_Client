import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';

import CustomTable from '@common/component/CustomTable';
import CustomConfirmDialog from '@common/component/CustomConfirmDialog';
import * as RedirectActions from '@store/actions/RedirectActions';

import * as CLASS_ACTION from '@store/actions/ClassActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';

import * as filter from '@common/functions/ConvertNotXssFilter';

import * as axiosGet from '@axios/get';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  requireFont: {
    color: 'red'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const ClassInfo = () => {
  const classes = useStyles();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const selectClassIdx = useSelector(
    state => state['SelectUtil']['selectClass']['classIdx']
  );
  const [classInfo, setClassInfo] = useState({});
  const addClassInfo = useSelector(state => state['Class']['classInfo']);
  const dispatch = useDispatch();

  const [tableDataList, setTableDataList] = useState();
  const [tableDataCount, setTableDataCount] = useState();
  const [tableDataHeader, setTableDataHeader] = useState([
    '과제 번호',
    '과제명',
    '과제 시작일',
    '과제 종료일',
    '조회수',
    '마감 이후 제출 여부',
    '제출 과제 관람 여부'
  ]);

  const redirectPage_updateClass = () => {
    dispatch(CLASS_ACTION.save_class(classInfo));
    dispatch(
      RedirectActions.isRedirect(true, '/class/' + selectClassIdx + '/update')
    );
  };

  const rowClickHandle = idx => {
    dispatch(ProgressBarActions.isProgressBar(true));
    dispatch(RedirectActions.isRedirect(true, '/class/report/' + idx));
  };

  const requestData = (idx, page, size) => {
    axiosGet.getNotContainsData('/professor/class/' + idx, getResponse);
    let data = {
      page: page,
      size: size,
      name: '',
      startDate: '',
      endDate: '',
      searchType: ''
    };
    axiosGet.getContainsData(
      '/report/' + idx + '/list',
      reportListResponse,
      data
    );
  };

  const reportListResponse = res => {
    setTableDataList(res['list']);
    setTableDataCount(res['totalCount']);
  };

  const getResponse = res => {
    setClassInfo(res);
    try {
      const instance = new Viewer({
        el: document.querySelector('#classInfoContent'),
        height: '500px',
        initialValue: filter.ConvertNotXssFilter(res['content'])
      });
    } catch {}
  };

  useEffect(() => {
    if (selectClassIdx !== -1) {
      requestData(selectClassIdx, 0, 10);
    }
  }, [selectClassIdx]);

  useEffect(() => {
    if (
      addClassInfo !== undefined &&
      addClassInfo !== null &&
      JSON.stringify(addClassInfo) !== '{}'
    ) {
      setClassInfo(addClassInfo);
      const instance = new Viewer({
        el: document.querySelector('#classInfoContent'),
        height: '500px',
        initialValue: filter.ConvertNotXssFilter(addClassInfo['content'])
      });
    }
  }, [addClassInfo]);

  return (
    <div className={classes.root}>
      {selectClassIdx === -1 && JSON.stringify(addClassInfo) === '{}' ? (
        <Redirect to={'/dashboard'} />
      ) : null}
      <Grid container spacing={3}>
        <CustomConfirmDialog
          open={confirmDialog}
          closeHandle={() => setConfirmDialog(false)}
          title={'수업 삭제'}
          content={
            '수업 삭제시 일주일(7일)간 보관됩니다. 정말 삭제하시겠습니까?'
          }
        />
        <Grid item lg={8} md={8} xl={8} xs={12}>
          <Paper className={classes.paper}>
            <Paper className={classes.paper}>
              <Grid xs={12} sm={12}>
                <br/>
                <h2>* 수업 정보</h2>
                <br/>
              </Grid>
            </Paper>
            <Grid container style={{ marginTop: 25 }}>
              <Grid xs={4} sm={4} style={{ marginTop: 15 }}>
                <h3>수업명</h3>
              </Grid>
              <Grid xs={8} sm={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={classInfo['name'] ? classInfo['name'] : ''}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid container style={{ marginTop: 15 }}>
                <Grid xs={4} sm={4} style={{ marginTop: 15 }}>
                  <h3>수업 시작일</h3>
                </Grid>
                <Grid xs={8} sm={8}>
                  <TextField
                    type="date"
                    fullWidth
                    variant="outlined"
                    value={classInfo['startDate'] ? classInfo['startDate'] : ''}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 15 }}>
                <Grid xs={4} sm={4} style={{ marginTop: 15 }}>
                  <h3>수업 종료일</h3>
                </Grid>
                <Grid xs={8} sm={8}>
                  <TextField
                    type="date"
                    fullWidth
                    variant="outlined"
                    value={classInfo['endDate'] ? classInfo['endDate'] : ''}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 35 }}>
                <Grid xs={4} sm={4} style={{ marginTop: 15 }}>
                  <h3>강의계획서</h3>
                </Grid>
                <Grid xs={8} sm={8}>
                  {classInfo['plannerDocName'] ? (
                    <a href="#">{classInfo['plannerDocName']}</a>
                  ) : (
                    '미등록'
                  )}
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 55 }}>
                <Grid xs={4} sm={4} style={{ marginTop: 15 }}>
                  <h3>수업 내용</h3>{' '}
                </Grid>
                <Grid xs={8} sm={8}>
                  <div style={{overflow:'scroll', height:700}}>
                    <Paper style={{padding:20}}>
                      <div id="classInfoContent"></div>
                    </Paper>
                  </div>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 100 }}>
                <Grid xs={12} sm={6} style={{ marginTop: 15 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => redirectPage_updateClass()}>
                    수업 수정
                  </Button>
                </Grid>
                <Grid xs={12} sm={6} style={{ marginTop: 15 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => setConfirmDialog(true)}>
                    수업 삭제
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item lg={4} md={4} xl={4} xs={12}>
          <TableContainer component={Paper}>
            <CustomTable
              rowClickHandle={() => {}}
              tableDescription={"수강 학생 리스트"}
              tableHeaderList={['이름']}
              noDataMessage={<h3>* 학생 리스트가 존재하지 않습니다.</h3>}
              exclude={''}
            />
          </TableContainer>
        </Grid>
      </Grid>
      <br />
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <TableContainer component={Paper}>
          <CustomTable
            rowClickHandle={rowClickHandle}
            tableDescription={"최신 과제 10건"}
            tableHeaderList={tableDataHeader}
            noDataMessage={<h3>* 과제 리스트가 존재하지 않습니다.</h3>}
            tableDataList={tableDataList}
            tableDataCount={tableDataCount}
            searchSeq={selectClassIdx}
            exclude={['classIdx', 'links', 'fileList', 'imgList', 'content']}
            requestData={requestData}
            notPageInfo
          />
        </TableContainer>
      </Grid>
    </div>
  );
};

export default ClassInfo;

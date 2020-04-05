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
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';

import * as CLASS_ACTION from '@store/actions/ClassActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';

import * as filter from '@common/functions/ConvertNotXssFilter';

import * as axiosGet from '@axios/get';
import * as axiosPut from '@axios/put';

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

const ClassInfo = (props) => {
  const classes = useStyles();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [dialogState,setDialogState] = useState(
    {
      title : '',
      content : '',
      dialogYseClick:null
    }
  );

  const selectClassIdx = useSelector(
    state => state['SelectUtil']['selectClass']['classIdx']
  );
  const [selectSignUp,setSelectSignUp] = useState(-1);
  const [classInfo, setClassInfo] = useState({});
  const [signUpList,setSignUpList] = useState([]);
  const addClassInfo = useSelector(state => state['Class']['classInfo']);
  const dispatch = useDispatch();

  const [tableDataList, setTableDataList] = useState([]);
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
      RedirectActions.isRedirect(true, '/class/' + props.match.params.idx + '/update')
    );
  };

  //수업 정보를 가져오는 메소드
  const requestData = (idx, page, size) => {
    axiosGet.getNotContainsData('/api/professor/class/' + idx, getResponse);
  };

  const reportListResponse = res => {
    setTableDataList(res['list']);
    setTableDataCount(res['totalCount']);
  };

  //수업 정보 콜백 메소드
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

  const deleteClassYse = () => {
    alert('fsd');
  }

  const showMessageBox = (title, level, visible) => {
    let message = {
      content: title,
      level: level,
      visible: visible
    };
    dispatch(SHOW_MESSAGE_ACTION.show_message(message));
  };

  useEffect(() => {
    requestData(props.match.params.idx, 0, 10);
  }, [props.match.params.idx]);

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
      <Grid container spacing={3}>
        <CustomConfirmDialog
          seq={dialogState['seq']}
          open={confirmDialog}
          closeHandle={() => {
            setConfirmDialog(false)
          }}
          title={dialogState['title']}
          content={dialogState['content']}
          handleYseClick={dialogState['dialogYseClick']}
        />
        <Grid item lg={8} md={8} xl={8} xs={12}>
          <Paper className={classes.paper}>
            <Paper className={classes.paper}>
              <Grid item xs={12} sm={12}>
                <br/>
                <h2>* 수업 정보</h2>
                <br/>
              </Grid>
            </Paper>
            <Grid container style={{ marginTop: 25 }}>
              <Grid item xs={4} sm={4} style={{ marginTop: 15 }}>
                <h3>수업명</h3>
              </Grid>
              <Grid item xs={8} sm={8}>
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
                <Grid item xs={4} sm={4} style={{ marginTop: 15 }}>
                  <h3>수업 시작일</h3>
                </Grid>
                <Grid item xs={8} sm={8}>
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
                <Grid item xs={4} sm={4} style={{ marginTop: 15 }}>
                  <h3>수업 종료일</h3>
                </Grid>
                <Grid item xs={8} sm={8}>
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
                <Grid item xs={4} sm={4} style={{ marginTop: 15 }}>
                  <h3>강의계획서</h3>
                </Grid>
                <Grid item xs={8} sm={8}>
                  {classInfo['plannerDocName'] ? (
                    <a href="#">{classInfo['plannerDocName']}</a>
                  ) : (
                    '미등록'
                  )}
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 55 }}>
                <Grid item xs={4} sm={4} style={{ marginTop: 15 }}>
                  <h3>수업 내용</h3>{' '}
                </Grid>
                <Grid item xs={8} sm={8}>
                  <div style={{overflow:'scroll', height:700}}>
                    <Paper style={{padding:20}}>
                      <div id="classInfoContent"></div>
                    </Paper>
                  </div>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 100 }}>
                <Grid item xs={12} sm={6} style={{ marginTop: 15 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => redirectPage_updateClass()}>
                    수업 수정
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginTop: 15 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => {
                      setDialogState({
                        title:'수업 삭제',
                        content:'수업 삭제시 일주일(7일)간 보관됩니다. 정말 삭제하시겠습니까?',
                        dialogYseClick:deleteClassYse
                      });
                      setConfirmDialog(true)
                    }}>
                    수업 삭제
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ClassInfo;

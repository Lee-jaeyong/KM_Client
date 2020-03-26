import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';
import {Redirect} from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';

import CustomTable from '@common/component/CustomTable';
import CustomConfirmDialog from '@common/component/CustomConfirmDialog';
import * as RedirectActions from '@store/actions/RedirectActions';

import * as CLASS_ACTION from '@store/actions/ClassActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';

import * as filter from '@common/functions/ConvertNotXssFilter';

import * as axiosGet from '@axios/get';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  requireFont: {
    color: 'red'
  }
}));

const ClassInfo = () => {
  const classes = useStyles();
  const [confirmDialog,setConfirmDialog] = useState(false);
  const selectClassIdx = useSelector(state=>state['SelectUtil']['selectClass']['classIdx']);
  const [classInfo,setClassInfo] = useState({});
  const addClassInfo = useSelector(state=>state['Class']['classInfo']);
  const dispatch = useDispatch();

  const [tableDataList,setTableDataList] = useState();
  const [tableDataCount,setTableDataCount] = useState();
  const [tableDataHeader,setTableDataHeader] = useState(
    ["과제 번호","과제명","과제 시작일","과제 종료일","조회수","마감 이후 제출 여부","제출 과제 관람 여부"]
  );

  const redirectPage_updateClass = () => {
    dispatch(CLASS_ACTION.save_class(classInfo));
    dispatch(RedirectActions.isRedirect(true,"/class/"+selectClassIdx+"/update"));
  }

  const rowClickHandle = (idx) => {
    dispatch(ProgressBarActions.isProgressBar(true));
    dispatch(RedirectActions.isRedirect(true,"/class/report/"+idx));
  }

  const requestData = (idx,page,size) => {
    axiosGet.getNotContainsData("/professor/class/"+idx,getResponse);
    let data = {
      page : page,
      size : size
    }
    axiosGet.getContainsData("/report/"+idx+"/list",reportListResponse,data);
  }

  const reportListResponse = (res) => {
    setTableDataList(res['list']);
    setTableDataCount(res['totalCount']);
  }

  const getResponse = (res) => {
    setClassInfo(res);
    try{
      document.getElementById("classInfoContent").innerHTML = filter.ConvertNotXssFilter(res['content']);
    }catch{
    }
  }

  useEffect(()=>{
    if(selectClassIdx !== -1){
      requestData(selectClassIdx,0,10);
    }
  },[selectClassIdx]);

  useEffect(()=>{
    if(addClassInfo !== undefined && addClassInfo !== null && JSON.stringify(addClassInfo) !== '{}'){
      setClassInfo(addClassInfo);
      document.getElementById("classInfoContent").innerHTML = filter.ConvertNotXssFilter(addClassInfo['content']);
    }
  },[addClassInfo]);

  return (
    <div className={classes.root}>
      { selectClassIdx === -1 && JSON.stringify(addClassInfo) === '{}' ? <Redirect to={"/dashboard"}/> : null}
      <Grid container spacing={3}>
        <CustomConfirmDialog
          open={confirmDialog}
          closeHandle={()=>setConfirmDialog(false)}
          title={"수업 삭제"}
          content={"수업 삭제시 일주일(7일)간 보관됩니다. 정말 삭제하시겠습니까?"}  
        />
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
                    <TextField fullWidth variant="outlined"
                    value={classInfo['name'] ? classInfo['name'] : ''}
                    disabled/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>수업 시작일</h2>
                  </TableCell>
                  <TableCell align="left">
                    <TextField type="date" fullWidth variant="outlined"
                    value={classInfo['startDate'] ? classInfo['startDate'] : ''}
                    disabled/>
                  </TableCell>
                  <TableCell align="center">
                    <h2>수업 종료일</h2>
                  </TableCell>
                  <TableCell align="left">
                    <TextField type="date" fullWidth variant="outlined"
                    value={classInfo['endDate'] ? classInfo['endDate'] : ''}
                    disabled
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>강의계획서</h2>
                    <br />
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                  {classInfo['plannerDocName'] ?  <a href="#">{classInfo['plannerDocName']}</a> : "미등록" }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>수업 내용</h2>
                    <br />
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    <div id="classInfoContent">
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="2">
                    <Button variant="contained" color="primary" fullWidth onClick={()=>redirectPage_updateClass()}>
                      수업 수정
                    </Button>
                  </TableCell>
                  <TableCell colSpan="2">
                    <Button variant="contained" color="secondary" fullWidth onClick={()=>setConfirmDialog(true)}>
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
            <CustomTable rowClickHandle={()=>{}}/>
          </TableContainer>
        </Grid>
      </Grid>
      <br/>
      <Grid item lg={12} md={12} xl={12} xs={12}>
          <TableContainer component={Paper}>
            <CustomTable
              rowClickHandle={rowClickHandle}
              tableHeaderList={tableDataHeader}
              tableDataList={tableDataList}
              tableDataCount={tableDataCount}
              searchSeq={selectClassIdx}
              exclude={['classIdx','links','fileList','imgList','content']}
              requestData={requestData}
            />
          </TableContainer>
        </Grid>
    </div>
  );
};

export default ClassInfo;

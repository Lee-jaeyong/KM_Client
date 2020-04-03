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
import {useSelector, useDispatch} from 'react-redux';

import CustomTable from '@common/component/CustomTable';
import CustomConfirmDialog from '@common/component/CustomConfirmDialog';
import * as RedirectActions from '@store/actions/RedirectActions';
import * as REPORT_ACTION from '@store/actions/ReportActions';

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

const ReportInfo = (props) => {
  const classes = useStyles();
  const [confirmDialog,setConfirmDialog] = useState(false);
  const [selectClassIdx,setSelectClassIdx] = useState(props.match.params.idx);
  const selectReport = useSelector(state=>state['Report']['reportInfo']);
  const [reportInfo,setReportInfo] = useState(JSON.stringify(selectReport) !== '{}' ? 
  {
    classIdx : selectReport['classIdx'],
    seq : selectReport['seq'],
    name : selectReport['name'],
    startDate : selectReport['startDate'],
    endDate : selectReport['endDate'],
    content : selectReport['content'],
    hit : selectReport['hit'],
    submitOverDue_state : selectReport['submitOverDue_state'],
    showOtherReportOfStu_state : selectReport['showOtherReportOfStu_state'],
  }
  : {
    classIdx : '',
    seq : '',
    name : '',
    startDate : '',
    endDate : '',
    content : '',
    hit : '',
    submitOverDue_state : '',
    showOtherReportOfStu_state : '',
  });

  const dispatch = useDispatch();

  const redirectPage_updateClass = () => {
    dispatch(RedirectActions.isRedirect(true,"/class/"+selectClassIdx+"/report/update"));
  }
  
  const reportInfoResponse = (res) => {
    dispatch(REPORT_ACTION.save_report(res));
    setReportInfo(res);
  }

  useEffect(()=>{
    axiosGet.getNotContainsData("/api/professor/report/"+selectClassIdx,reportInfoResponse);
  },[]);

  useEffect(()=>{
    document.getElementById("reportInfoContent").innerHTML = filter.ConvertNotXssFilter(reportInfo['content']);
  },[reportInfo]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <CustomConfirmDialog
          open={confirmDialog}
          closeHandle={()=>setConfirmDialog(false)}
          title={"과제 삭제"}
          content={"과제 삭제시 일주일(7일)간 보관됩니다. 정말 삭제하시겠습니까?"}  
        />
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan="4" align="center">
                    <h2>* 과제 정보</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <h2>과제명</h2>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    <TextField fullWidth variant="outlined" value={reportInfo['name'] ? reportInfo['name'] : ""} disabled/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>과제 시작일</h2>
                  </TableCell>
                  <TableCell align="left">
                    <TextField type="date" fullWidth variant="outlined" value={reportInfo['startDate'] ? reportInfo['startDate'] : ""} disabled/>
                  </TableCell>
                  <TableCell align="center">
                    <h2>과제 종료일</h2>
                  </TableCell>
                  <TableCell align="left">
                    <TextField type="date" fullWidth variant="outlined" value={reportInfo['endDate'] ? reportInfo['endDate'] : ""} disabled/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>과제 내용</h2>
                    <br />
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    <div id="reportInfoContent">
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>과제 이미지</h2>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    {selectReport['imgList'] ? selectReport['imgList'].split(',').map((img,idx)=>{
                      return (
                        <div>
                          <a href="#">{img}</a>
                          <br/>
                        </div>
                      )
                    })
                     : '이미지 없음'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>과제 파일</h2>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    {selectReport['fileList'] ? selectReport['fileList'].split(',').map((file,idx)=>{
                      return (
                        <div>
                          <a href="#">{file}</a>
                          <br/>
                        </div>
                      )
                    })
                     : '파일 없음'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="2">
                    <Button variant="contained" color="primary" fullWidth onClick={()=>redirectPage_updateClass()}>
                      과제 수정
                    </Button>
                  </TableCell>
                  <TableCell colSpan="2">
                    <Button variant="contained" color="secondary" fullWidth onClick={()=>setConfirmDialog(true)}>
                      과제 삭제
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <br/>
      <Grid item lg={12} md={12} xl={12} xs={12}>
          <TableContainer component={Paper}>
            {/* <CustomTable /> */}
          </TableContainer>
        </Grid>
    </div>
  );
};

export default ReportInfo;

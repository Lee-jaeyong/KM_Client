import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';

import CustomSearchHeader from '@common/component/CustomSearchHeader';
import CustomTable from '@common/component/CustomTable';
import * as RedirectActions from '@store/actions/RedirectActions';

const testHeader = ["학생번호","이름","아이디","비밀번호"];

const testDataList = 
[
  {seq:0,name:"이재용",id:"dlwodyd202",pass:"dlwodyd111",address:"덕계동"},
  {seq:1,name:"윤지원",id:"dbswldnjs202",pass:"dbswldnjs111",address:"상계동"},
  {seq:0,name:"이재용",id:"dlwodyd202",pass:"dlwodyd111",address:"덕계동"},
  {seq:1,name:"윤지원",id:"dbswldnjs202",pass:"dbswldnjs111",address:"상계동"},
  {seq:0,name:"이재용",id:"dlwodyd202",pass:"dlwodyd111",address:"덕계동"},
  {seq:1,name:"윤지원",id:"dbswldnjs202",pass:"dbswldnjs111",address:"상계동"},
  {seq:0,name:"이재용",id:"dlwodyd202",pass:"dlwodyd111",address:"덕계동"},
  {seq:1,name:"윤지원",id:"dbswldnjs202",pass:"dbswldnjs111",address:"상계동"},
  {seq:0,name:"이재용",id:"dlwodyd202",pass:"dlwodyd111",address:"덕계동"},
  {seq:1,name:"윤지원",id:"dbswldnjs202",pass:"dbswldnjs111",address:"상계동"},
  {seq:0,name:"이재용",id:"dlwodyd202",pass:"dlwodyd111",address:"덕계동"},
  {seq:1,name:"윤지원",id:"dbswldnjs202",pass:"dbswldnjs111",address:"상계동"},
  {seq:0,name:"이재용",id:"dlwodyd202",pass:"dlwodyd111",address:"덕계동"},
  {seq:1,name:"윤지원",id:"dbswldnjs202",pass:"dbswldnjs111",address:"상계동"},
  {seq:0,name:"이재용",id:"dlwodyd202",pass:"dlwodyd111",address:"덕계동"},
  {seq:1,name:"윤지원",id:"dbswldnjs202",pass:"dbswldnjs111",address:"상계동"},
  {seq:0,name:"이재용",id:"dlwodyd202",pass:"dlwodyd111",address:"덕계동"},
  {seq:1,name:"윤지원",id:"dbswldnjs202",pass:"dbswldnjs111",address:"상계동"},
];

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const NoticeList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const requestData = (idx,page,size) => {
    alert(idx + "===" + page + "===" +size);
    let data = {
      page : page,
      size : size
    }
    //axiosGet.getContainsData("/report/"+idx+"/list",reportListResponse,data);
  }

  const rowClickHandle = (idx) => {
    //dispatch(RedirectActions.isRedirect(true,"/class/notice/"+idx));
  }
  return (
    <div className={classes.root}>
      <br></br>
      <CustomSearchHeader title="공지사항 검색"/>
      <div>
        <br></br>
        <br></br>
      </div>
      <CustomTable 
        rowClickHandle={rowClickHandle}
        tableHeaderList={testHeader}
        tableDataList={testDataList}
        tableDataCount={testDataList.length}
        searchSeq={props.match.params.idx}
        exclude={"address"}
        requestData={requestData}
      />
    </div>
  );
};

export default NoticeList;

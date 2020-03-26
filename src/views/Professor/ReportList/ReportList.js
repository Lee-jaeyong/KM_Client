import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { useDispatch,useSelector } from 'react-redux';

import CustomSearchHeader from '@common/component/CustomSearchHeader';
import CustomTable from '@common/component/CustomTable';
import * as RedirectActions from '@store/actions/RedirectActions';

import * as axiosGet from '@axios/get';

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

const ReportList = (props) => {
  const selectClassIdx = useSelector(state=>state['SelectUtil']['selectClass']['classIdx']);
  const dispatch = useDispatch();
  const [tableDataList,setTableDataList] = useState();
  const [tableDataCount,setTableDataCount] = useState();
  const [tableDataHeader,setTableDataHeader] = useState(
    ["과제 번호","과제명","과제 시작일","과제 종료일","조회수","마감 이후 제출 여부","제출 과제 관람 여부"]
  );

  const rowClickHandle = (idx) => {
    dispatch(RedirectActions.isRedirect(true, '/class/report/' + idx));
  }

  const requestData = (idx,page,size) => {
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

  useEffect(()=>{
    requestData(selectClassIdx,0,10);
  },[selectClassIdx]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <br />
      <CustomSearchHeader title="과제 검색" />
      <div>
        <br />
        <br />
      </div>
      <CustomTable 
        rowClickHandle={rowClickHandle}
        tableHeaderList={tableDataHeader}
        tableDataList={tableDataList}
        tableDataCount={tableDataCount}
        searchSeq={selectClassIdx}
        exclude={['classIdx','links','fileList','imgList','content']}
        requestData={requestData}
      />
    </div>
  );
};

export default ReportList;

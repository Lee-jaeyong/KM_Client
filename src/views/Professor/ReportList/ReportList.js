import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { useDispatch,useSelector } from 'react-redux';

import CustomSearchHeader from '@common/component/CustomSearchHeader';
import CustomTable from '@common/component/CustomTable';
import * as RedirectActions from '@store/actions/RedirectActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';

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

  const [searchInput,setSearchInput] = useState({
    name : '',
    startDate :'',
    endDate : '',
    searchType : ''
  });

  const rowClickHandle = (idx) => {
    dispatch(RedirectActions.isRedirect(true, '/class/report/' + idx));
  }

  const requestData = (idx,page,size,searchData) => {
    let data = {
      page : page,
      size : size,
      name : searchInput['name'] ? searchInput['name'] : '',
      startDate :searchInput['startDate'] ? searchInput['startDate'] : '',
      endDate : searchInput['endDate'] ? searchInput['endDate'] : '',
      searchType : searchInput['searchType'] ? searchInput['searchType'] : '',
    }
    if(searchData !== undefined){
      data = {
        ...data,
        name :searchData['name'],
        startDate :searchData['startDate'],
        endDate : searchData['endDate'],
        searchType : searchData['searchType'],
      }
    }
    dispatch(ProgressBarActions.isProgressBar(true));
    setTimeout(() => {
      axiosGet.getContainsData("/report/"+idx+"/list",reportListResponse,data);
    }, 300);
  }

  const reportListResponse = (res) => {
    setTableDataList(res['list']);
    setTableDataCount(res['totalCount']);
  }

  const searchHandle = (searchData) => {
    setSearchInput(searchData);
    requestData(selectClassIdx,0,10,searchData);
  }

  useEffect(()=>{
    requestData(selectClassIdx,0,10);
  },[selectClassIdx]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <br />
      <CustomSearchHeader searchHandle={searchHandle} title="과제 검색" />
      <div>
        <br />
        <br />
      </div>
      <CustomTable
        tableDescription={"과제 정보"}
        rowClickHandle={rowClickHandle}
        noDataMessage={<h3>* 과제 리스트가 존재하지 않습니다.</h3>}
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

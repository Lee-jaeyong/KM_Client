import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import CustomTable from '@common/component/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import * as RedirectActions from '@store/actions/RedirectActions';
import CustomSearchHeader from '@common/component/CustomSearchHeader';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const StuReportList = props => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selectClassIdx = useSelector(
    state => state['SelectUtil']['selectClass']['classIdx']
  );
  const [tableDataList, setTableDataList] = useState();
  const [tableDataCount, setTableDataCount] = useState();
  const [tableDataHeader, setTableDataHeader] = useState([
    '과제 번호',
    '과제명',
    '과제 시작일',
    '과제 종료일',
    '조회수',
    '마감 이후 제출 여부',
    '제출 과제 관람 여부',
    '확인상태'
  ]);

  const testData = [
    {
      reportNum: 1,
      reportName: 'spring에대하여간략히 설명',
      startDate: '2020-01-29',
      endDate: '2020-03-01',
      hit: 10,
      deadlinesubmissionYorN: 'N',
      PreviewYorN: 'Y',
      checkState: '확인전'
    },
    {
      reportNum: 2,
      reportName: '@Autowired 란 무엇인지 설명',
      startDate: '2020-01-29',
      endDate: '2020-03-01',
      hit: 10,
      deadlinesubmissionYorN: 'N',
      PreviewYorN: 'Y',
      checkState: '확인전'
    },
    {
      reportNum: 3,
      reportName: 'bean으로 등록되는 애노테이션 종류',
      startDate: '2020-01-29',
      endDate: '2020-03-01',
      hit: 10,
      deadlinesubmissionYorN: 'N',
      PreviewYorN: 'Y',
      checkState: '확인전'
    },
    {
      reportNum: 4,
      reportName: '스프링 데이터 JPA',
      startDate: '2020-01-29',
      endDate: '2020-03-01',
      hit: 10,
      deadlinesubmissionYorN: 'N',
      PreviewYorN: 'Y',
      checkState: '확인전'
    }
  ];

  const rowClickHandle = reportidx => {
    dispatch(RedirectActions.isRedirect(true, 'reportView/1'));
    //dispatch(RedirectActions.isRedirect(true, 'reportView/' + reportidx));
  };

  const testRequestData = () => {
    alert('Sdf');
  };

  // const requestData = (idx,page,size) => {
  //   let data = {
  //     page : page,
  //     size : size
  //   }
  //   axiosGet.getContainsData("/report/"+idx+"/list",reportListResponse,data);
  // }
  // const reportListResponse = (res) => {
  //   setTableDataList(res['list']);
  //   setTableDataCount(res['totalCount']);
  // }

  // useEffect(() => {
  //   requestData(selectClassIdx, 0, 10);
  // }, [selectClassIdx]);

  return (
    <div className={classes.root}>
      <CustomSearchHeader title="과제 검색" />
      <br />
      <CustomTable
        exclude={''}
        requestData={testRequestData}
        //tableDataList={tableDataList}
        rowClickHandle={rowClickHandle}
        searchSeq={selectClassIdx}
        tableDataCount={tableDataCount}
        tableDataList={testData}
        tableDescription="과제 목록"
        tableHeaderList={tableDataHeader}
      />
    </div>
  );
};

export default StuReportList;

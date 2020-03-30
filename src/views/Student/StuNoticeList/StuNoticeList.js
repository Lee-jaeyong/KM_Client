import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import CustomTable from '@common/component/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import * as RedirectActions from '@store/actions/RedirectActions';
import CustomSearchHeader from '@common/component/CustomSearchHeader';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const StuNoticeList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selectClassIdx = useSelector(
    state => state['SelectUtil']['selectClass']['classIdx']
  );
  const [tableDataList, setTableDataList] = useState();
  const [tableDataCount, setTableDataCount] = useState();
  const [tableDataHeader, setTableDataHeader] = useState([
    'No.',
    '제목',
    '내용',
    '조회수'
  ]);

  const testData = [
    {
      No: 1,
      title: '개강 첫날 공지사항 입니다.',
      content: '지각 3번 결석처리 / 결석3번 학점 F...',
      hit: 21
    },
    {
      No: 2,
      title: '과제에 대한 공지사항',
      content:
        '당일 과제는 다음주에 해당 수업 요일 오후11시59분까지 제출해야합니다....',
      hit: 30
    },
    {
      No: 3,
      title: '체육대회 공지사항',
      content: '체육대회 피구, 달리기....',
      hit: 8
    },
    {
      No: 4,
      title: '진단평가 공지',
      content: '3월29일까지 모든 과목에 진단평가를 완료 해주세요',
      hit: 17
    }
  ];

  const rowClickHandle = idx => {
    dispatch(RedirectActions.isRedirect(true, '/class/report/' + idx));
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
      <CustomSearchHeader title="공지사항 검색" />
      <br />
      <CustomTable
        exclude={''}
        requestData={testRequestData}
        //tableDataList={tableDataList}
        rowClickHandle={rowClickHandle}
        searchSeq={selectClassIdx}
        tableDataCount={tableDataCount}
        tableDataList={testData}
        tableDescription="공지사항"
        tableHeaderList={tableDataHeader}
      />
    </div>
  );
};

export default StuNoticeList;

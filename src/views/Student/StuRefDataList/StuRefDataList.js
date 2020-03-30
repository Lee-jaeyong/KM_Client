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

const StuRefDataList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selectClassIdx = useSelector(
    state => state['SelectUtil']['selectClass']['classIdx']
  );
  const [tableDataList, setTableDataList] = useState();
  const [tableDataCount, setTableDataCount] = useState();
  const [tableDataHeader, setTableDataHeader] = useState([
    '자료 번호',
    '제목',
    '내용',
    '조회수'
  ]);

  const testData = [
    {
      dataNum: 1,
      title: '운영체제의 역사',
      content: '운영체제의 역사에',
      hit: 21
    },
    {
      dataNum: 2,
      title: 'java : 이중for문에 대한 도전과제',
      content: '운영체제의 역사에',
      hit: 30
    },
    {
      dataNum: 3,
      title: '스프링 데이터란 무엇인가',
      content: '운영체제의 역사에',
      hit: 8
    },
    {
      dataNum: 4,
      title: '공부할 의지를 키워주는 글',
      content: '운영체제의 역사에',
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
      <CustomSearchHeader title="참고자료 검색" />
      <br />
      <CustomTable
        exclude={''}
        requestData={testRequestData}
        //tableDataList={tableDataList}
        rowClickHandle={rowClickHandle}
        searchSeq={selectClassIdx}
        tableDataCount={tableDataCount}
        tableDataList={testData}
        tableDescription="참고자료"
        tableHeaderList={tableDataHeader}
      />
    </div>
  );
};

export default StuRefDataList;

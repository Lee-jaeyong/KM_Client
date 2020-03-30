import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import CustomTable from '@common/component/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import * as RedirectActions from '@store/actions/RedirectActions';
import CustomSearchHeader from '@common/component/CustomSearchHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const StuQnAList = () => {
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
    '날짜',
    '조회수',
    '답변상태'
  ]);

  const testData = [
    {
      No: 1,
      title: 'spring에대하여',
      content: '스프링MVC와 스프링부트의 차이점은 무엇인가요',
      date: '2020-03-01',
      hit: 10,
      state: '답변완료'
    },
    {
      No: 2,
      title: '스프링JPA',
      content: 'JPA를 사용하는것과 안사용하는것의 차이는?',
      date: '2020-03-04',
      hit: 16,
      state: '답변완료'
    },
    {
      No: 3,
      title: '운영체제에서',
      content: '쉘과 커널은 각각 어떻게 동작하나요?',
      date: '2020-04-01',
      hit: 5,
      state: '답변완료'
    },
    {
      No: 4,
      title: '리액트에서',
      content: '리액트는 프레임워크인가요?',
      date: '2020-03-01',
      hit: 10,
      state: '답변 미완료'
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
      <CustomSearchHeader title="질의응답 검색" />
      <br />
      <Grid
        container
        spacing={3}
        style={{ marginBottom: 0 }}
      >
        <Grid
          align="right"
          item
          xs={12}
        >
          <Button
            color="primary"
            variant="contained"
          >
            질문 등록
          </Button>
        </Grid>
      </Grid>
      <CustomTable
        exclude={''}
        requestData={testRequestData}
        //tableDataList={tableDataList}
        rowClickHandle={rowClickHandle}
        searchSeq={selectClassIdx}
        tableDataCount={tableDataCount}
        tableDataList={testData}
        tableDescription="Q/A"
        tableHeaderList={tableDataHeader}
      />
    </div>
  );
};

export default StuQnAList;

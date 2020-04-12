import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import CustomTable from '@common/component/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import * as RedirectActions from '@store/actions/RedirectActions';
import CustomJumbotron from '@common/component/CustomJumbotron';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CustomListCard from '@common/component/CustomListCard';

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

  const [testContents, setTestContents] = useState(
    '수업내용의 앞 부분입니다 이건 엄청 길지않아요 한 20자정도?수업내용의 앞 부분입니다 이건 엄청 길지않아요 한 20자정도?//////수업내용의 뒷 부분입니다 이건 엄청 길어서 숨겨져있어요ㅎㅎㅎㅎ수업내용의 뒷 부분입니다 이건 엄청 길어서 숨겨져있어요ㅎㅎㅎㅎ수업내용의 뒷 부분입니다 이건 엄청 길어서 숨겨져있어요ㅎㅎㅎㅎ수업내용의 뒷 부분입니다 이건 엄청 길어서 숨겨져있어요ㅎㅎㅎㅎ'
  );

  const reportMockData = [
    {
      idx: 1,
      professorName: '박남일',
      img: 'img',
      date: '2020.04.10',
      reportContent:
        '라즈베리파이키트와 메가보드키트를 수령하도록 수고해준 학생들이 있어 수업에 차질이 없도록 해주어 고맙습니다. 아직 수령하지 않은 학생은 빠르게 수령하기를 바랍니다. 출석과 함께 라즈베리파이 키트 수령/미수령 기입해주기 바랍니다.',
      fileName: ['프로젝트계획서 양식.xlsm'],
      replyCount: 10
    },
    {
      idx: 2,
      professorName: '박남일',
      img: 'img',
      date: '2020.03.04 ~ 2020.03.11',
      reportContent:
        '주차별 퀴즈들은 잘 보이고 풀고 제출이 되나요? 사본으로 저에게 제출해야 내용이 저도 보입니다. 2주차는 퀴즈 질문 1개입니다.',
      fileName: ['프로젝트계획서 양식.xlsm', '과제 참고자료.hwp'],
      replyCount: 6
    },
    {
      idx: 3,
      professorName: '박남일',
      img: 'img',
      date: '2020.04.10 ~ 2020.04.22',
      reportContent:
        '아쉽게 답변상황이 저조하고 이번 주 보드 준비가 어려우니 기 예정된 라즈베리파이 수업을 이어가겠습니다. 학교에서 설치해도 2주간은 소요되니 가정에서 충분히 환경설치 학습하시고 오기 바랍니다.',
      fileName: ['과제 참고자료.hwp'],
      replyCount: 5
    },
    {
      idx: 4,
      professorName: '박남일',
      img: 'img',
      date: '2020.04.01 ~ 2020.04.11',
      reportContent:
        '이번 주에 대부분의 학생이 준비하면 다음 주 수업에 nodeMCU 수업진행하고, 만약 늦춰진다면 저도 한주 후에 nodeMCU 자료 올리겠습니다.',
      fileName: ['프로젝트계획서 양식.xlsm', '과제 참고자료.hwp'],
      replyCount: 14
    },
    {
      idx: 5,
      professorName: '박남일',
      img: 'img',
      date: '2020.03.20 ~ 2020.03.28',
      reportContent:
        '주차별 퀴즈들은 잘 보이고 풀고 제출이 되나요? 사본으로 저에게 제출해야 내용이 저도 보입니다. 2주차는 퀴즈 질문 1개입니다.',
      fileName: ['프로젝트계획서 양식.xlsm'],
      replyCount: 2
    },
    {
      idx: 6,
      professorName: '박남일',
      img: 'img',
      date: '2020.03.04',
      reportContent:
        '라즈베리파이키트와 메가보드키트를 수령하도록 수고해준 학생들이 있어 수업에 차질이 없도록 해주어 고맙습니다. 아직 수령하지 않은 학생은 빠르게 수령하기를 바랍니다. 출석과 함께 라즈베리파이 키트 수령/미수령 기입해주기 바랍니다.',
      fileName: ['프로젝트계획서 양식.xlsm', '과제 참고자료.hwp'],
      replyCount: 8
    }
  ];
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
      <Grid container>
        <Grid
          item
          xs={1}
        />
        <Grid
          item
          xs={10}
        >
          <CustomJumbotron
            plusContents={testContents}
            prevContents={testContents.substr(0, 74)}
            professor="이재용"
            title="JAVA 활용"
          />
        </Grid>
      </Grid>
      {reportMockData
        ? reportMockData.map((report, idx) => {
          return (
            <Grid
              container
              key={idx}
            >
              <Grid
                item
                xs={1}
              />
              <Grid
                item
                style={{ marginTop: 20 }}
                xs={10}
              >
                <CustomListCard
                  avatarContent={report.img}
                  date={report.date}
                  fileName={report.fileName}
                  mainContent={report.reportContent}
                  replyCount={report.replyCount}
                  writerName={report.professorName}
                />
              </Grid>
              <Grid
                item
                xs={1}
              />
            </Grid>
          );
        })
        : null}
    </div>
  );
};

export default StuReportList;

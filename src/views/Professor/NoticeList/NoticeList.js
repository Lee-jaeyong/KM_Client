import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

import { useDispatch,useSelector } from 'react-redux';

import * as axiosGet from '@axios/get';

function createData(seq,classInfo,name,startDate,endDate,useSubmitDates,content,fileList) {
  return { seq,classInfo, name, startDate,endDate,useSubmitDates, content,fileList};
}

const rows = [
  createData(1,'C언어', '제 1강에 대한 Quiz 입니다','null','null','NO', '동영상을 시청 한 후 다음의 Quiz를 꼭 풀어보세요 Quiz는 아래의 Google 설문지로 작성되었습니다.',[{name:'abc.xlxs',type:'FILE'},{name:'abc12.xlxs',type:'FILE'},{name:'abcdsadsa.xlxs',type:'FILE'}]),
  createData(2,'C언어', '1주차_과제(아두이노와 라즈베리파이비교)','2020-01-10','2020-10-10','YES', '아두이노 와 라즈베리파이 비교를 해주세요 장점 단점'),
  createData(3,'C언어', 'C언어 레포트 3','2020-01-10','2020-10-10','YES', 'C언어 레포트 콘텐츠 영역'),
  createData(4,'C언어', 'C언어 레포트 4', '2020-01-10','2020-10-10','YES','C언어 레포트 콘텐츠 영dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd역'),
  createData(5,'C언어', 'C언어 레포트 5', '2020-01-10','2020-10-10','YES','C언어 레포트 콘텐츠 영역'),
  createData(6,'C언어', 'C언어 레포트 11','2020-01-10','2020-10-10','YES', 'C언어 레포트 콘텐츠 영역'),
  createData(7,'C언어', 'C언어 레포트 12','2020-01-10','2020-10-10','YES', 'C언어 레포트 콘텐츠 영역'),
  createData(8,'C언어', 'C언어 레포트 13','2020-01-10','2020-10-10','YES', 'C언어 레포트 콘텐츠 영역'),
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding:20
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(10),
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: '등 록' },
];

const ReportList = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [reportListData,setReportListData] = useState(rows);
  const [reportListPage,setReportListPage] = useState(0);
  const [loaddingData,setLoaddingData] = useState(false);
  const [replyModal,setReplyModal] = useState(false);
  const [addReportModal,setAddReportModal] = useState(false);
  const [readReportModal,setReadReportModal] = useState(false);
  const [readReportInfo,setReadReportInfo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setAddReportModal(true);
    setOpen(false);
  };

  const getReportList = (event) => {
    if(event.target.scrollHeight > 2000 && event.target.scrollTop + 1000 >= event.target.scrollHeight){
      setReportListPage(1+reportListPage);
      let result = reportListData;
      for(let i =0;i<10;i++){
        result = result.concat({
          classInfo:'자바',
          name:'자바 레포트 '+(i+1),
          remainDate:'30',
          content:'자바 레포트 콘텐츠 영역'
        });
      }
      setTimeout(() => {
        setReportListData(result);
        setLoaddingData(false);
      }, 1000);
      setLoaddingData(true);
    }
  }

  const readReportHandle = (value) => {
    setReadReportModal(true);
    setReadReportInfo(value);
  }

  const showReply = (idx) => {
    setReplyModal(true);
  }

  return (
    <div id="reportListTable" className={classes.root} style={{overflowY:'scroll',height:1000}} onScroll={getReportList}>
      <Grid container spacing={3}>
        <Grid item xs={2}/>
        <Grid item xs={8}>
        </Grid>
        <Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportList;

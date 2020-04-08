import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

import { useDispatch,useSelector } from 'react-redux';

import ReportReply from './component/ReportReply/ReportReply';
import ReportListTable from './component/ReportList/ReportList';
import AddReport from './component/AddReport/AddReport';
import ReadReport from './component/ReadReport/ReadReport';

import * as axiosGet from '@axios/get';

function createData(seq,classInfo,name,startDate,endDate,useSubmitDates,content) {
  return { seq,classInfo, name, startDate,endDate,useSubmitDates, content};
}

const rows = [
  createData(1,'C언어', 'C언어 레포트 1','null','null','NO', 'C언어 레포트 콘텐츠 영역'),
  createData(2,'C언어', 'C언어 레포트 2','2020-01-10','2020-10-10','YES', 'C언어 레포트 콘텐츠 영역'),
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
  const [readReportInfo,setReadReportInfo] = useState({});

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
    <div className={classes.root} style={{overflowY:'scroll',height:1000}} onScroll={getReportList}>
      <Grid container spacing={3}>
        <Grid item xs={2}/>
        <Grid item xs={8}>
          <div>
              <ReportListTable
                readReportHandle={readReportHandle}
                data={reportListData}
                replyShowClick={()=>showReply}
                {...props}/>
              {loaddingData ? (
                    <div>
                      <CircularProgress />
                    </div>
                  ):
                  null
              }
          </div>
          <ReportReply replyModalClose={()=>setReplyModal(false)} open={replyModal}/>
        </Grid>
        <Grid>
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              className={classes.speedDial}
              hidden={hidden}
              icon={<SpeedDialIcon />}
              onClose={()=>setOpen(false)}
              onOpen={handleOpen}
              open={open}
            >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={()=>handleClose(action['name'])}
              />
            ))}
          </SpeedDial>
        </Grid>
      </Grid>
      <AddReport open={addReportModal} handleClose={()=>{setAddReportModal(false);setOpen(false)}}/>
      <ReadReport open={readReportModal} handleClose={()=>setReadReportModal(false)}/>
    </div>
  );
};

export default ReportList;

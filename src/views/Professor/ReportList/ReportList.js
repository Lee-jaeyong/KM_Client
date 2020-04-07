import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { useDispatch,useSelector } from 'react-redux';

import ReportReply from './component/ReportReply/ReportReply';
import ReportListTable from './component/ReportList/ReportList';

import * as axiosGet from '@axios/get';

function createData(classInfo,name,remainDate,content) {
  return { classInfo, name, remainDate, content};
}

const rows = [
  createData('C언어', 'C언어 레포트 1',20, 'C언어 레포트 콘텐츠 영역'),
  createData('C언어', 'C언어 레포트 2',20, 'C언어 레포트 콘텐츠 영역'),
  createData('C언어', 'C언어 레포트 3',20, 'C언어 레포트 콘텐츠 영역'),
  createData('C언어', 'C언어 레포트 4', 20,'C언어 레포트 콘텐츠 영dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd역'),
  createData('C언어', 'C언어 레포트 5', 20,'C언어 레포트 콘텐츠 영역'),
  createData('C언어', 'C언어 레포트 11',20, 'C언어 레포트 콘텐츠 영역'),
  createData('C언어', 'C언어 레포트 12',20, 'C언어 레포트 콘텐츠 영역'),
  createData('C언어', 'C언어 레포트 13',20, 'C언어 레포트 콘텐츠 영역'),
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const getReportList = (event) => {
    if(event.target.scrollTop + 1000 >= event.target.scrollHeight){
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

  const showReply = (idx) => {
    setReplyModal(true);
  }

  return (
    <div className={classes.root} style={{overflowY:'scroll',height:1000}} onScroll={getReportList}>
      <Grid container spacing={3}>
        <Grid item xs={2}/>
        <Grid item xs={8}>
          <div>
              <ReportListTable data={reportListData} replyShowClick={()=>showReply}/>
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
              onClose={handleClose}
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
    </div>
  );
};

export default ReportList;

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
  Box,
  CircularProgress,
  Button
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { useSelector, useDispatch } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import * as filter from '@common/functions/ConvertNotXssFilter';
import mockData from './data';
import JoinStuList from './component/JoinStuList/UserTable';
import SignUpStuList from './component/SignUpStuList/SignUpStuList';

import Toolbar from './component/Toolbar/ToolBar';
import UpdateClass from './component/UpdateClass/UpdateClass';
import CustomConfirmDialog from '@common/component/CustomConfirmDialog';
import * as axiosGet from '@axios/get';
import * as axiosPut from '@axios/put';
import uuid from 'uuid/v1';
import Fade from '@material-ui/core/Fade';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  appBar: {
    flexGrow: 1,
  }
}));

const ClassInfo = props => {
  const [classInfo,setClassInfo] = useState(
    {
      seq : 1,
      name : "C언어",
      content : "C언어 수업은 ..... 진행됩니다.",
      type:'MAJOR',
      file:'C언어 강의 계획서.xlsx',
      selectMenu:[
        "REPORT","NOTICE"
      ]
    }
  );  
  const [joinUserList,setJoinUserList] = useState(mockData);
  const [signUpList,setSignUpList] = useState(mockData);
  const [iconBtnState,setIconBtnState] = useState('joinStu');
  const [plannerDocProgress,setPlannerDocProgress] = useState(false);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [signUpClassForStuPage,setSignUpClassForStuPage] = useState(0);
  const [joinClassForStuPage,setJoinClassForStuPage] = useState(0);
  const [loaddingData,setLoaddingData] = useState(false);
  
  const [updateClass,setUpdateClass] = useState(false);
  const [confirmDialog,setConfirmDialog] = useState({
    open : false,
    title : "",
    content : ""
  });

  const handleChange = (event, newValue) => {
    if(newValue === 0)
    {
      setJoinUserList(mockData);
      setSignUpClassForStuPage(0);
    }
    else if(newValue === 1){
      setSignUpList(mockData);
      setJoinClassForStuPage(0);
    }
    setValue(newValue);
  };

  const getJoinClassForStu = (event) => {
    if(event.target.scrollTop + 700 >= event.target.scrollHeight){
      setJoinClassForStuPage(1+joinClassForStuPage);
      let result = joinUserList;
      for(let i =0;i<10;i++){
        result = result.concat({
          id: parseInt(14732060) + i,
          name: 'Merrile Burgett',
          address: {
            country: 'USA',
            state: 'Utah',
            city: 'Salt Lake City',
            street: '368 Lamberts Branch Road'
          },
          email: 'merrile.burgett@devias.io',
          phone: '801-301-7894',
          avatarUrl: '/images/avatars/avatar_10.png',
        });
      }
      setTimeout(() => {
        setJoinUserList(result);
        setLoaddingData(false);
      }, 1000);
      setLoaddingData(true);
    }
  }

  const getSignUpClassForStu = (event) => {
    if(event.target.scrollTop + 700 >= event.target.scrollHeight){
      setSignUpClassForStuPage(1+signUpClassForStuPage);
      let result = signUpList;
      for(let i =0;i<10;i++){
        result = result.concat({
          id: parseInt(14732060) + i,
          name: 'Merrile Burgett',
          address: {
            country: 'USA',
            state: 'Utah',
            city: 'Salt Lake City',
            street: '368 Lamberts Branch Road'
          },
          email: 'merrile.burgett@devias.io',
          phone: '801-301-7894',
          avatarUrl: '/images/avatars/avatar_10.png',
        });
      }
      setTimeout(() => {
        setSignUpList(result);
        setLoaddingData(false);
      }, 1000);
      setLoaddingData(true);
    }
  }

  const signUpClassSuccessHandle = () => {
    setConfirmDialog({
      open : true,
      title : "수업 승인",
      content :"체크된 위 학생들을 모두 수업 승인하시겠습니까?"
    });
    setIconBtnState('joinStu'); 
  }

  const signUpClassFaildHandle = () => {
    setConfirmDialog({
      open : true,
      title : "수업 취소",
      content :"체크된 위 학생들을 모두 수업 취소하시겠습니까?"
    });
    setIconBtnState('signUpStu');
  }

  const dialogYseClick = () => {
    setConfirmDialog({...confirmDialog,open:false});
    if(iconBtnState === 'joinStu'){
      let joinStuListChk = document.getElementsByName('joinStuListChk');
      let joinStuArr = [];
      for(let i =0;i<joinStuListChk.length;i++)
        if(joinStuListChk[i].checked){
          joinStuArr.push(joinStuListChk[i].value);
        }
      alert(joinStuArr);
    }else{

    }
  }

  const classPlannerDocDownload = () => {
    if(plannerDocProgress)
      return;
    setTimeout(() => {
      setPlannerDocProgress(false);
    }, 1000);
    setPlannerDocProgress(true);
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column-reverse" justify="flex-start">
        <Grid>
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/images/1.png"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {classInfo ? classInfo['name'] : null}
                  <Tooltip title="수업 수정" placement="right">
                    <IconButton onClick={()=>setUpdateClass(true)}>
                      <CreateIcon/>
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {classInfo ? classInfo['content'] : null}
                  <br/>
                  <Button
                    style={{marginTop:15}}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={plannerDocProgress ? <CircularProgress color="secondary" style={{width:20, height:20}}/> : <CloudUploadIcon />}
                    onClick={classPlannerDocDownload}
                  >
                    {classInfo['file']}
                  </Button>
                </Typography>
              </CardContent>
              <div className={classes.appBar}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example">
                    <Tab label="수업 참여 인원" {...a11yProps(0)} />
                    <Tab label="수업 신청 인원" {...a11yProps(1)} />
                  </Tabs>
              </div>
              <TabPanel value={value} index={0}>
                <Toolbar type={"signUpClassSuccess"} toolbarBtnHandle={signUpClassSuccessHandle}/>
                {loaddingData ? (
                  <div>
                    <CircularProgress />
                  </div>
                ):
                null
                }
                <Fade in timeout={600}>
                  <div style={{overflowY:'scroll',height:700}} onScroll={getJoinClassForStu}>
                    <JoinStuList users={joinUserList}/>
                  </div>
                </Fade>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Toolbar type={"signUpClassFaild"} toolbarBtnHandle={signUpClassFaildHandle}/>
                {loaddingData ? (
                  <div>
                    <CircularProgress />
                  </div>
                ):
                null
                }
                <Fade in>
                  <div style={{overflow:'scroll',height:700}} onScroll={getSignUpClassForStu}>
                    <SignUpStuList users={signUpList}/>
                  </div>
                </Fade>
              </TabPanel>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <UpdateClass open={updateClass} handleClose={()=>setUpdateClass(false)} classInfo={classInfo}/>
      <CustomConfirmDialog
        open={confirmDialog['open']} 
        closeHandle={()=>setConfirmDialog({...confirmDialog,open:false})}
        handleYseClick={dialogYseClick}
        title={confirmDialog['title']} 
        content={confirmDialog['content']}
      />
    </div>
  );
};

export default ClassInfo;

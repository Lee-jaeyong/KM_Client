import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import ReportInfo from './ReportInfo';
import ReportSubmitInfo from './ReportSubmitInfo';
import ReportSubmitUserList from './ReportSubmitUserList';

const reportSubmitUserListData = [
  {seq : 1,id : '14731060',name:"이재용",submitDate : '2020-04-09'},
  {seq : 2,id : '14731061',name:"윤지원",submitDate : '2020-04-09'},
  {seq : 3,id : '14731062',name:"삼재용",submitDate : '2020-04-09'},
  {seq : 4,id : '14731063',name:"일재용",submitDate : '2020-04-09'},
  {seq : 5,id : '14731064',name:"사재용",submitDate : '2020-04-09'},
  {seq : 6,id : '14731065',name:"오재용",submitDate : '2020-04-09'},
  {seq : 7,id : '14731066',name:"육재용",submitDate : '2020-04-09'},
]

const reportSubmitInfoData = [
  {seq : 1,id:'14731060',content : '아두이노와 다르게 wiring.h를 선언해줘야 딜레이가 가능하고 헤더파일들이 내부적으로 많은 의존성을 갖는다는것을 다시한번 생각해보게 되었습니다.',date:'2020-01-01'},
  {seq : 2,id:'14731061',content : '주파수의 상하비로 LED밝기를 조절하는것을 알게되었습니다.',date:'2020-01-11',fileList:[{name:'fsdkjfhsdfkjsdh',type:'FILE'}]},
  {seq : 3,id:'14731062',content : '택배 도착 곧 한다고 하니 조금 기다리면 되겠습니다.',date:'2020-11-01',fileList:[{name:'fsdkjfhsdfkjsdh',type:'IMG'}]},
  {seq : 4,id:'14731063',content : '아직 수령하지 못해 진행하기 어렵습니다.',date:'2020-04-01',fileList:[{name:'fsdkjfhsdfkjsdh',type:'IMG'}]},
  {seq : 5,id:'14731064',content : '개발환경 구축하는 방법에 대해 알게되었고, 마침 리눅스 공부하고 싶다는 생각이 들었는데 이번 강의를 계기로 리눅스와 라즈베리파이를 동시에 배울 수 있다는 점에서 기쁩니다.',date:'2020-03-01',fileList:[{name:'fsdkjfhsdfkjsdh',type:'FILE'}]},
  {seq : 6,id:'14731065',content : '개발환경 구축하는법 알게되었습니다. 과정들이 리눅스 TUI환경이라 생소하지만 신기했어요!',date:'2020-02-01',fileList:[{name:'fsdkjfhsdfkjsdh',type:'FILE'}]},
  {seq : 7,id:'14731066',content : '라즈베리를 수령하지 못해 진행하기 어렵습니다',date:'2020-11-01'},
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const {reportInfo} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(props['open']);
  const [showReport,setShowReport] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const showSubmitReport = (id) => {
    for(let i =0;i<reportSubmitInfoData.length;i++){
      if(reportSubmitInfoData[i]['id'] === id){
        setShowReport(reportSubmitInfoData[i]);
        return;
      }
    }
  }

  useEffect(()=>{
    setOpen(props['open']);
  },[props['open']]);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              과제 보기
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              닫 기
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{padding:20}}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <ReportInfo reportInfo={reportInfo}/>
            </Grid>
            <Grid item xs={6} sm={2}>
              <ReportSubmitUserList showSubmitReport={showSubmitReport} userList={reportSubmitUserListData}/>
            </Grid>
            <Grid item xs={6} sm={6}>
              <ReportSubmitInfo reportInfo={showReport}/>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
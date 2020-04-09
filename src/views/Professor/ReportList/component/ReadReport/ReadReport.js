import React,{useEffect} from 'react';
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
import ReportSubmitList from './ReportSubmitInfo';
import ReportSubmitUserList from './ReportSubmitUserList';

const reportSubmitUserListData = [
  {seq : 1,id : '14731060',name:"이재용",submitDate : '2020-04-09'},
  {seq : 2,id : '14731060',name:"이재용",submitDate : '2020-04-09'},
  {seq : 3,id : '14731060',name:"이재용",submitDate : '2020-04-09'},
  {seq : 4,id : '14731060',name:"이재용",submitDate : '2020-04-09'},
]

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
  const [open, setOpen] = React.useState(props['open']);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

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
            <Grid item xs={4}>
              <ReportInfo reportInfo={reportInfo}/>
            </Grid>
            <Grid item xs={2}>
              <ReportSubmitUserList userList={reportSubmitUserListData}/>
            </Grid>
            <Grid item xs={6}>
              <ReportSubmitList reportInfo={reportInfo}/>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
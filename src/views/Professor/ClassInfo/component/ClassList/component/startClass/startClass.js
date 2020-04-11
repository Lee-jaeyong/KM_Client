import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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

export default function StartClass(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props['open']);

  const handleClose = () => {
    let constraints = {
      video:true,
      audio : false
    }
    let realTimeImg = document.getElementById('realTimeImg');
    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
      realTimeImg.srcObject = null;
      realTimeImg.pause();
      stream.getTracks()[0].stop();
    });
    props.handleClose();
    setOpen(false);
  };

  const showVideo = () => {
    let constraints = {
      video:true,
      audio : false
    }
    let realTimeImg = document.getElementById('realTimeImg');
    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
      realTimeImg.srcObject = stream;
      realTimeImg.play();
    });
  }

  const stopVideo = () =>{
  }

  useEffect(()=>{
    setOpen(props['open']);
  },[props['open']]);

  useEffect(()=>{
    // let constraints = {
    //   video:true,
    //   audio : false
    // }
    // let realTimeImg = document.getElementById('realTimeImg');
    // alert(realTimeImg);
    // // navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
    // //   realTimeImg.srcObject = stream;
    // //   realTimeImg.play();
    // // });
  },[])

  return (
    <div>
      <Dialog disableEscapeKeyDown={true} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xl={8}>
              <Grid container spacing={2}>
                <Grid item xl={6}>
                  <Button fullWidth variant="contained" color="secondary" onClick={showVideo}>수업 시작</Button>
                </Grid>
                <Grid item xl={6}>
                  <Button fullWidth variant="contained" color="primary" onClick={stopVideo}>수업 중지</Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <video style={{width:1200, marginLeft:30,marginTop:30}} id="realTimeImg"/>
                </Grid>
                <Grid item>
                  <canvas id="serverImg"/>
                </Grid>
                <Grid item>
                  <div id="imgSource">
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={4}>
              <div>

              </div>
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </div>
  );
}
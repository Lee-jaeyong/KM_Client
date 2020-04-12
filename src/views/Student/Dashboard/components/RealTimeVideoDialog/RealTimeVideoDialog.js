import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide
    direction="up"
    ref={ref}
    {...props}
         />;
});

export default function RealTimeVideoDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props['open']);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props['open']);
  }, [props['open']]);

  return (
    <div>
      <Dialog
        fullScreen
        onClose={handleClose}
        open={open}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              aria-label="close"
              color="inherit"
              edge="start"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item>
            <video
              id="realTimeImg"
              style={{
                background: 'blue',
                width: 1200,
                marginLeft: 30,
                marginTop: 30
              }}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

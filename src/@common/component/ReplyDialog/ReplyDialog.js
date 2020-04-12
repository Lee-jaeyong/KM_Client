import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      className={classes.root}
      disableTypography
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogFooter = withStyles(styles)(props => {
  return (
    <MuiDialogTitle
      disableTypography
      style={{ padding: 1 }}
    >
      <ListItem style={{ position: 'relative', bottom: 10 }}>
        <Grid container>
          <Grid
            item
            xs={1}
          >
            <Avatar
              position="start"
              style={{
                position: 'relative',
                top: 20,
                width: 25,
                height: 25
              }}
            />
          </Grid>
          <Grid
            item
            xs={10}
          >
            <TextField
              fullWidth
              id="standard-basic"
              label="댓글 입력"
            />{' '}
          </Grid>
          <Grid
            item
            xs={1}
          >
            <Button
              color="primary"
              style={{ position: 'relative', top: 15 }}
            >
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      </ListItem>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function ReplyDialog(props) {
  const [open, setOpen] = useState(props['open']);

  const { data } = props;

  const classes = useStyles();

  useEffect(() => {
    setOpen(props['open']);
  }, [props['open']]);

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Dialog
        aria-labelledby="customized-dialog-title"
        fullWidth
        onClose={handleClose}
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          댓글
        </DialogTitle>
        <Divider />
        <DialogContent>
          <List className={classes.root}>
            {data
              ? data.map((reply, idx) => {
                return (
                  <ListItem
                    alignItems="flex-start"
                    key={idx}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker">
                        {reply.name.substr(0, 1)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={reply.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            className={classes.inline}
                            color="textPrimary"
                            component="span"
                            variant="body2"
                          >
                            {reply.content}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    {reply['id'] === 'dbswldnjs' ? (
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="delete"
                          edge="end"
                        >
                          <CancelIcon style={{ color: '#f50057' }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    ) : null}
                  </ListItem>
                );
              })
              : null}

            {/* <ListItem style={{ top: 10, position: 'relative' }}>
              <Grid container>
                <Grid
                  item
                  xs={1}
                >
                  <Avatar
                    position="start"
                    style={{
                      position: 'relative',
                      top: 20,
                      width: 25,
                      height: 25
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                >
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="댓글 입력"
                  />{' '}
                </Grid>
                <Grid
                  item
                  xs={1}
                >
                  <Button
                    color="primary"
                    style={{ position: 'relative', top: 20 }}
                  >
                    <SendIcon />
                  </Button>
                </Grid>
              </Grid>
            </ListItem> */}
          </List>
        </DialogContent>
        <Divider />

        <DialogFooter />
      </Dialog>
    </Container>
  );
}

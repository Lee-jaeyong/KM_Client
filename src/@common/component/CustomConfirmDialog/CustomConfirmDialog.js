import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CustomConfirmDialog(props) {
  const [open, setOpen] = React.useState(props.open);

  useEffect(()=>{
    setOpen(props.open)
  },[props.open]); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleYseClick = () =>{
    props.handleYseClick();
    props.closeHandle();
  }

  const handleClose = () => {
    setOpen(false);
    props.closeHandle();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleYseClick} color="primary">
            예
          </Button>
          <Button onClick={handleClose} color="primary">
            아니요
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
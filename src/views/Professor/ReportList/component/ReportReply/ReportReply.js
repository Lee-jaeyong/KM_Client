import React,{useState,useEffect} from 'react';
import {Button,Table,TableBody,TableRow,TableCell,Avatar,TextField} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SendIcon from '@material-ui/icons/Send';

const replyData = [
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
]

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(props['open']);

  const handleClose = () => {
    setOpen(false);
    props.replyModalClose();
  };

  useEffect(()=>{
      setOpen(props['open']);
  },[props['open']]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        </DialogTitle>
        <DialogContent>
            <Table>
              <TableBody>
                {replyData.map((reply, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell style={{ minWidth: 10 }}>
                        <Avatar />
                      </TableCell>
                      <TableCell align="center">{reply['id']}</TableCell>
                      <TableCell align="center">{reply['name']}</TableCell>
                      <TableCell align="center">{reply['content']}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell />
                  <TableCell colSpan={2} align="center">
                    <TextField
                      id="outlined-basic"
                      label="댓글 작성"
                      variant="outlined"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      댓글 작성&nbsp;
                      <SendIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

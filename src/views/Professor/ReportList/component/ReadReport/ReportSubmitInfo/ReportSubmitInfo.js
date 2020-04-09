import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import ReportReply from './ReportReply';
import ImageIcon from '@material-ui/icons/Image';

const reportReply = [
  {seq:1,name:'윤지원',content:'안녕하세요 댓글한번 남깁니다.',date:'2020-01-01'},
  {seq:2,name:'윤지원',content:'안녕하세요 댓글한번 남깁니다.',date:'2020-01-01'},
  {seq:3,name:'윤지원',content:'안녕하세요 댓글한번 남깁니다.',date:'2020-01-01'},
  {seq:4,name:'윤지원',content:'안녕하세요 댓글한번 남깁니다.',date:'2020-01-01'},
  {seq:5,name:'윤지원',content:'안녕하세요 댓글한번 남깁니다.',date:'2020-01-01'},
  {seq:6,name:'윤지원',content:'안녕하세요 댓글한번 남깁니다.',date:'2020-01-01'},
  {seq:7,name:'윤지원',content:'안녕하세요 댓글한번 남깁니다.',date:'2020-01-01'},
  {seq:8,name:'윤지원',content:'안녕하세요 댓글한번 남깁니다.',date:'2020-01-01'}
]

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ReportSubmitList(props) {
  const {reportInfo} = props;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
     <CardContent>
        <Typography className={classes.pos} color="textSecondary">
        {reportInfo ? reportInfo['date'] + "일 제출" : null} 
        </Typography>
          {reportInfo ? reportInfo['fileList'] ? reportInfo['fileList'].map((file,id)=>{
            return(
              file['type'] === 'IMG' ? (
                  <Chip
                    style={{marginRight:5}}
                    avatar={<ImageIcon/>}
                    label={file['name']}
                    clickable
                    color="primary"
                  />
              ) : null
            )
          }): null : null}
        {reportInfo ? reportInfo['fileList'] ? reportInfo['fileList'].map((file,id)=>{
            return(
              file['type'] === 'IMG' ? (
                  <Chip
                    style={{marginRight:5}}
                    avatar={<ImageIcon/>}
                    label={file['name']}
                    clickable
                    color="primary"
                  />
              ) : null
            )
          }): null : null}
        <Divider light  style={{marginTop:10}}/>
        <Typography variant="body2" component="p" style={{height:400,overflowY:"auto",marginTop:30}}>
          <span style={{fontSize:17}}>{reportInfo ? reportInfo['content'] : null}</span>
          <br />
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </Typography>
        <Divider light style={{position:'relative', top:-10}}/>
        <Grid container>
          <Grid item xs={11}>
            <TextField
              multiline
              fullWidth
              rowsMax="3"
              rows="3"
              variant="outlined"
              className={classes.margin}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="default"
              style={{marginLeft:10,height:90}}
            >
              <SendIcon/>
            </Button>
          </Grid>
        </Grid>
        <Divider light  style={{marginTop:10}}/>
        <ReportReply replyList={reportReply}/>
      </CardContent>
    </Card>
  );
}
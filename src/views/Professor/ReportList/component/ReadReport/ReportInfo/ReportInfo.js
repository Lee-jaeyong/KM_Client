import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,Chip,Avatar} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ImageIcon from '@material-ui/icons/Image';

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

export default function SimpleCard(props) {
  const {reportInfo} = props;
  const classes = useStyles();

  useEffect(()=>{
  },[props['reportInfo']]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
        {reportInfo ? reportInfo['name'] : null}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {reportInfo ? reportInfo['useSubmitDates'] === 'NO' ? '기한 없음' : 
          reportInfo['startDate'] + "일 부터 ~ "+ reportInfo['endDate'] + "일 까지": null
        }
        </Typography>
        <Typography variant="body2" component="p">
          {reportInfo ? reportInfo['fileList'] ? reportInfo['fileList'].map((file,id)=>{
            return(
              file['type'] === 'FILE' ? (
                  <Chip
                    style={{marginRight:5}}
                    avatar={<FileCopyIcon/>}
                    label={file['name']}
                    clickable
                    color="primary"
                  />
              ) : null
            )
          }): null : null}
        </Typography>
        <Typography variant="body2" component="p">
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
        </Typography>
        <Divider light  style={{marginTop:10}}/>
        <Typography variant="body2" component="p" 
        style={
          {
            msOverflowStyle:"none",
            height:660,
            overflowY:"auto",
            marginTop:30
          }
        }>
          <span style={{fontSize:17}}>{reportInfo ? reportInfo['content'] : null}</span>
          <br />
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <img src="/images/dlwodyd.jpg"/>
        </Typography>
      </CardContent>
    </Card>
  );
}
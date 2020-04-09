import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  const bull = <span className={classes.bullet}>•</span>;

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
          fileList
        </Typography>
        <Typography variant="body2" component="p">
          imgList
        </Typography>
        <Divider light  style={{marginTop:10}}/>
        <Typography variant="body2" component="p" style={{height:620,overflowY:"auto",marginTop:30}}>
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
      <CardActions>
        <Button size="small">수 정</Button>
        <Button size="small">삭 제</Button>
      </CardActions>
    </Card>
  );
}
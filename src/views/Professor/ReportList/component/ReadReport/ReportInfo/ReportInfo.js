import React from 'react';
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

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          fileList
        </Typography>
        <Typography variant="body2" component="p">
          imgList
        </Typography>
        <Divider light  style={{marginTop:10}}/>
        <Typography variant="body2" component="p" style={{height:620,overflowY:"auto",marginTop:30}}>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
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
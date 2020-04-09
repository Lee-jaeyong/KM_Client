import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 20
  },
  avatar: {
    backgroundColor: red[500]
  },
  avatarsSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  replyMargin: {
    marginTop: 15,
    marginLeft: 6,
    height: 1
  }
}));

export default function CustomListCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
          >
            img
          </Avatar>
        }
        subheader="2020. 03. 22"
        title="박남일"
      />
      <CardContent style={{ bottom: 20, position: 'relative' }}>
        <CardActionArea>
          <Typography
            component="p"
            style={{ fontSize: 17 }}
            variant="body2"
          >
            오늘의 과제 강의에 있는 과제를 캡쳐해서 제출하세요. 이미지파일은
            압축하지 않고 제출합니다. 열심히하세요오늘의 과제 강의에 있는 과제를
            캡쳐해서 제출하세요. 이미지파일은 압축하지 않고 제출합니다.
            열심히하세요
          </Typography>
        </CardActionArea>
        <br />
        <Divider />
        <Typography
          className={classes.replyMargin}
          color="textSecondary"
          component="div"
          variant="body2"
        >
          <ListItem style={{ marginTop: -20 }}>
            <a
              href=""
              onClick={e => {
                e.preventDefault();
              }}
              onMouseLeave={e => (e.target.style.textDecoration = 'none')}
              onMouseOver={e => (e.target.style.textDecoration = 'underline')}
              style={{
                color: 'gray',
                textDecoration: 'none'
              }}
            >
              댓글 (0개)
            </a>
            <TextField
              id="input-with-icon-textfield"
              InputProps={{
                startAdornment: (
                  <Avatar
                    style={{ width: 25, height: 25 }}
                    position="start"></Avatar>
                )
              }}
              style={{ marginLeft: 30, width: '87%' }}
            />
            <Button color="primary">
              <SendIcon />
            </Button>
          </ListItem>
        </Typography>
      </CardContent>
    </Card>
  );
}

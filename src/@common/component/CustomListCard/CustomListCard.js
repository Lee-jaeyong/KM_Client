import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    maxHeight: 163
  },
  avatar: {
    backgroundColor: red[500]
  },
  replyMargin: {
    marginTop: 6,
    marginLeft: 6
  }
}));

export default function CustomListCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
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
        <Typography
          component="p"
          variant="body2"
        >
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
        <br />
        <Divider />
        <Typography
          className={classes.replyMargin}
          color="textSecondary"
          component="p"
          variant="body2"
        >
          <a
            href=""
            onClick={e => {
              e.preventDefault();
            }}
            onMouseLeave={e => (e.target.style.textDecoration = 'none')}
            onMouseOver={e => (e.target.style.textDecoration = '')}
            style={{ color: 'gray', textDecoration: 'none' }}
          >
            댓글 (0개)
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
}

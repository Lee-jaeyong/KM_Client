import React,{useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function ReportSubmitUserList(props) {
  const {userList} = props;
  const classes = useStyles();

  return (
    <Card style={{height:850,overflowY:"auto"}}>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            U
          </Avatar>
        }
        title="제출자 명단"
      />
      <CardContent>
        <List>
            {userList ? userList.map((user,idx)=>{
                return (
                    <ListItem key={idx} button onClick={()=>props['showSubmitReport'](user['id'])}>
                        <ListItemIcon>
                        <Avatar alt={user['name']} src="/images/dlwodyd.jpg" />
                        </ListItemIcon>
                        <ListItemText>
                          {user['name']}
                        </ListItemText>
                    </ListItem>
                )
            }) : null}
        </List>
      </CardContent>
    </Card>
  );
}

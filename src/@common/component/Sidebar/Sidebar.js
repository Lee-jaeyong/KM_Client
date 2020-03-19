import React,{useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const [userInfo,setUserInfo] = useState({
    name : '이재용',
    subject : '융합소프트웨어'
  });

  const [classList,setClassList] = useState(
    [
      {
        title: '자바',
        pageList : [
          {pageName:"과제 등록",href:"/icons/7"},
          {pageName:"과제 목록",href:"/icons/8"},
          {pageName:"Q/A",href:"/icons/9"}
        ]
      },
      {
        title: '자바(학생)',
        pageList : [
          {pageName:"과제 목록",href:"/naver"},
          {pageName:"참고자료 목록",href:"/idaum"},
          {pageName:"질문하기",href:"/kakao"},
          {pageName:"Q/A",href:"/dlwodyd"},
        ]
      },
    ]
  );

  const [otherPage,setOtherPage] = useState(
    [
      {
        title: '수업 등록',
        href:'/class/add'
      },
      {
        title: '설정',
        href:'/bbb'
      },
    ]
  );

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile userInfo={userInfo}/>
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={classList}
          dropDown
        />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={otherPage}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;

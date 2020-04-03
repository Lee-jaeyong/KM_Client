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

  const deleteProps = Object.assign({}, props);
  delete deleteProps.open;
  delete deleteProps.variant;
  delete deleteProps.otherPage;
  delete deleteProps.classList;
  delete deleteProps.classIdx;
  delete deleteProps.divider;
  delete deleteProps.userInfo;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...deleteProps}
        className={clsx(classes.root, className)}
      >
        <Profile userInfo={props.userInfo}/>
        <Divider className={classes.divider} />
        <SidebarNav
          classIdx={props.classIdx}
          className={classes.nav}
          pages={props.classList}
          dropDown
        />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={props.otherPage}
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

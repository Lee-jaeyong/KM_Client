import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Fab,
  Tooltip
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import BuildIcon from '@material-ui/icons/Build';

import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';

import AddClass from './component/AddClass';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  const [addClassShowState, setAddClassShowState] = useState(false);

  const [notifications] = useState([]);
  const progressBarState = useSelector(
    state => state['ProgressBar']['visible']
  );
  const dispatch = useDispatch();

  const showAddClassForm = () => {
    setAddClassShowState(true);
  };

  useEffect(() => {}, [progressBarState]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      style={{
        backgroundColor: '#2457BD'
      }}
    >
      <Toolbar>
        <RouterLink to="/dashboard">
          <img
            alt="Logo"
            src="/images/kyungmin.png"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Tooltip title="수업 등록">
          <IconButton
            color="inherit"
            onClick={() => showAddClassForm()}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Hidden mdDown>
          <Tooltip title="알 림">
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="설 정">
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <BuildIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      {progressBarState ? (
        <div>
          <LinearProgress color="secondary" />
          <LinearProgress
            color="secondary"
            variant="query"
          />
        </div>
      ) : null}
      <AddClass
        handleClose={() => setAddClassShowState(false)}
        open={addClassShowState}
      />
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;

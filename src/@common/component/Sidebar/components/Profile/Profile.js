import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, userInfo,...rest } = props;
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <br/>
      <Avatar
        alt="Person"
        className={classes.avatar}
        style={{
          minWidth:100,
          minHeight:100
        }}
        component={RouterLink}
        src={userInfo.userImg}
        to="/dashboard"
      />
      <Typography
        className={classes.name}
        variant="h5"
      >
        {userInfo.name}
      </Typography>
      <Typography variant="body2"><strong>{userInfo.subject}</strong></Typography>
      <br/>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;

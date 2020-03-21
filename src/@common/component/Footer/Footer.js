import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="http://www.kyungmin.ac.kr/site/kmc/main.do"
          target="_blank"
        >
          경민대학교
        </Link>
        . KM
      </Typography>
      <Typography variant="caption">
        (11618)경기도 의정부시 서부로 545   대표 : 031-828-7700 입시 : 031-828-7722
        COPYRIGHT(C) 2013 KYUNGMIN UNIVERSITY. ALL RIGHTS RESERVED
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;

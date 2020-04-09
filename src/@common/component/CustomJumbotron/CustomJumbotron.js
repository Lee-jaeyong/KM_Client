/*
 * 각classMain 최상단 컬러카드
 */
import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Button } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.dark,
    marginRight: theme.spacing(1)
  }
}));

export default function CustomJumbotron(props) {
  let objProps = Object.assign({}, props);
  delete objProps.plusContents;
  delete objProps.prevContents;

  const plusViewContent = useRef();

  const { className, ...rest } = props;
  const [aText, setAText] = useState('...더보기');
  const [contentDisplay, setContentDisplay] = useState('none');

  const classes = useStyles();

  const plusViewContentHandle = event => {
    event.preventDefault();
    if (plusViewContent.current.style.display === '') {
      setAText('...더보기');
      setContentDisplay('none');
    } else {
      setAText('...접기');
      setContentDisplay('');
    }
  };

  return (
    <Card
      //style={{ backgroundColor: '#e1bee7' }}
      style={{
        background: 'linear-gradient(to right bottom, #fff59d, #FFFFFF)'
      }}
      {...objProps}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
            >
              {props.title}
            </Typography>
            <Typography variant="subtitle1">
              교수 : {props.professor}
            </Typography>
          </Grid>
          <Grid item>
            <Button>
              {/*props로 Button url 다운로드로이동*/}
              <span>강의계획서</span>
              <GetAppIcon className={classes.icon} />
            </Button>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {props.prevContents}
            <span
              ref={plusViewContent}
              style={{ display: contentDisplay }}
            >
              {props.plusContents}
            </span>
            <a
              href=""
              onClick={plusViewContentHandle}
            >
              {aText}
            </a>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

CustomJumbotron.propTypes = {
  className: PropTypes.string
};

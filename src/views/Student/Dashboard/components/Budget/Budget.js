/*
 * 각classMain 최상단 컬러카드
 */
import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Button
} from '@material-ui/core';
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

const Budget = props => {
  const plusViewContent = useRef();

  const { className, ...rest } = props;
  const [aText, setAText] = useState('...더보기');

  const classes = useStyles();

  const plusViewContentHandle = event => {
    event.preventDefault();
    if (plusViewContent.current.style.display === '') {
      plusViewContent.current.style.display = 'none';
      setAText('...더보기');
    } else {
      setAText('...접기');
      plusViewContent.current.style = {
        display: ''
      };
    }
  };

  return (
    <Card
      //style={{ backgroundColor: '#e1bee7' }}
      style={{
        background: 'linear-gradient(to right bottom, #fff59d, #FFFFFF)'
      }}
      {...rest}
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
              JAVA활용 프로젝트
            </Typography>
            <Typography variant="subtitle1">교수 : 박남일</Typography>
          </Grid>
          <Grid item>
            <Button>
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
            수업내용 부분입니다. 3학년 1학기 자바 활용 프로젝트기반 수업입니다.
            엄청 길면 더보기눌러서 더 볼수있습니다람쥐
            <span
              ref={plusViewContent}
              style={{ display: 'none' }}
            >
              111수업내용 부분입니다. 3학년 1학기 자바 활용 프로젝트기반
              수업입니다. 엄청 길면 더보기눌러서 더 볼수있습니다람쥐수업내용
              부분입니다. 3학년 1학기 자바 활용 프로젝트기반 수업입니다. 엄청
              길면 더보기눌러서 더 볼수있습니다람쥐수업내용 부분입니다. 3학년
              1학기 자바 활용 프로젝트기반 수업입니다. 엄청 길면 더보기눌러서 더
              볼수있습니다람쥐수업내용 부분입니다. 3학년 1학기 자바 활용
              프로젝트기반 수업입니다. 엄청 길면 더보기눌러서 더
              볼수있습니다람쥐
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
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;

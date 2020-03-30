import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, Topbar, Footer } from '@common/component';
import * as RedirectActions from '@store/actions/RedirectActions';
import { Redirect } from 'react-router-dom';
import CustomMessageBox from '@common/component/CustomMessageBox';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#ffffff'
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();

  const isRedirect = useSelector(
    state => state['Redirect']['redirect']['isRedirect']
  );

  const redirectURL = useSelector(
    state => state['Redirect']['redirect']['url']
  );

  const dispatch = useDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });
  const progressBarState = useSelector(
    state => state['ProgressBar']['visible']
  );
  const [openSidebar, setOpenSidebar] = useState(false); //user정보
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const [userInfo, setUserInfo] = useState({
    name: '윤지원',
    subject: '융합소프트웨어',
    userImg: '/images/yunjiwon.jpg'
  });

  const [classList, setClassList] = useState(
    //수업데이터
    [
      {
        classIdx: 1,
        title: 'Spring기초',
        pageList: [
          { pageName: '과제 목록', href: '/stu/class/' + 1 + '/reportList' },
          { pageName: '참고자료', href: '/stu/class/' + 1 + '/refDataList' },
          { pageName: '공지사항', href: '/stu/class/' + 1 + '/noticeList' },
          { pageName: 'Q/A', href: '/stu/class/' + 1 + '/qnaList' }
        ]
      },
      {
        classIdx: 2,
        title: '운영체제',
        pageList: [
          { pageName: '과제 목록', href: '/stu/class/' + 2 + '/reportList' },
          { pageName: '참고자료', href: '/stu/class/' + 2 + '/refDataList' },
          { pageName: '공지사항', href: '/stu/class/' + 2 + '/noticeList' },
          { pageName: 'Q/A', href: '/stu/class/' + 2 + '/qnaList' }
        ]
      },
      {
        classIdx: 3,
        title: 'RaspberryPi',
        pageList: [
          { pageName: '과제 목록', href: '/stu/class/' + 3 + '/reportList' },
          { pageName: '참고자료', href: '/stu/class/' + 3 + '/refDataList' },
          { pageName: '공지사항', href: '/stu/class/' + 3 + '/noticeList' },
          { pageName: 'Q/A', href: '/stu/class/' + 3 + '/qnaList' }
        ]
      },
      {
        classIdx: 4,
        title: '안드로이드 활용',
        pageList: [
          { pageName: '과제 목록', href: '/stu/class/' + 4 + '/reportList' },
          { pageName: '참고자료', href: '/stu/class/' + 4 + '/refDataList' },
          { pageName: '공지사항', href: '/stu/class/' + 4 + '/noticeList' },
          { pageName: 'Q/A', href: '/stu/class/' + 4 + '/qnaList' }
        ]
      }
    ]
  );

  //수업외 메뉴
  const [otherPage, setOtherPage] = useState([
    {
      title: 'My 강의실',
      href: '/myClassRoom'
    },
    {
      title: '설정',
      href: '/setForUser'
    }
  ]);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  useEffect(() => {
    dispatch(RedirectActions.isRedirect(false));
  }, [isRedirect]);

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        classList={classList}
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        otherPage={otherPage}
        student
        userInfo={userInfo}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {progressBarState ? (
          <Backdrop
            className={classes.backdrop}
            onClick={handleClose}
            open={open}
          >
            <CircularProgress
              className={classes.progress}
              color="secondary"
            />
          </Backdrop>
        ) : null}
        {children}
        {isRedirect ? <Redirect to={redirectURL} /> : null}
        <CustomMessageBox />
        <Footer />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;

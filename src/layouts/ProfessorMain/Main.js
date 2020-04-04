import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, Topbar, Footer } from '@common/component';
import * as RedirectActions from '@store/actions/RedirectActions';
import CustomMessageBox from '@common/component/CustomMessageBox';
import * as SideBarActions from '@store/actions/SideBarActions';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Redirect} from 'react-router-dom';

import * as axiosGet from '@axios/get';
import * as Oauth from '@oauth/AcessToken';

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
    color: '#fff',
  }
}));

const Main = props => {
  const [userInfo, setUserInfo] = useState({
    name: '이재용',
    subject: '융합소프트웨어',
    userImg: '/images/dlwodyd.jpg'
  });

  const [classList, setClassList] = useState([]);

  const [otherPage, setOtherPage] = useState([
    {
      title: '수업 등록',
      href: '/class/add'
    },
    {
      title: '설정',
      href: '/settings'
    }
  ]);

  const { children } = props;
  const isRedirect = useSelector(
    state => state['Redirect']['redirect']['isRedirect']
  );
  const redirectURL = useSelector(
    state => state['Redirect']['redirect']['url']
  );
  const isSideBarUpdate = useSelector(state => state['SideBar']['isUpdate']);
  const progressBarState = useSelector(
    state => state['ProgressBar']['visible']
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  function getResponse(res) {
    const classInfo = res['_embedded']['kM_classVOList'];
    if (classInfo.length > 0) {
      let result = [];
      for (let i = 0; i < classInfo.length; i++) {
        let pageData = [];
        if (classInfo[i]['selectMenu'].includes('REPORT')) {
          pageData.push({
            pageName: '과제 등록',
            href: '/class/' + classInfo[i]['seq'] + '/report/add'
          });
          pageData.push({
            pageName: '과제 목록',
            href: '/class/' + classInfo[i]['seq'] + '/reportList'
          });
        }
        if (classInfo[i]['selectMenu'].includes('NOTICE')) {
          pageData.push({
            pageName: '공지사항 등록',
            href: '/class/' + classInfo[i]['seq'] + '/notice/add'
          });
          pageData.push({
            pageName: '공지사항 목록',
            href: '/class/' + classInfo[i]['seq'] + '/noticeList'
          });
        }
        if (classInfo[i]['selectMenu'].includes('REFERENCE')) {
          pageData.push({
            pageName: '참고자료 등록',
            href: '/class/' + classInfo[i]['seq'] + '/referenceData/add'
          });
          pageData.push({
            pageName: '참고자료 목록',
            href: '/class/' + classInfo[i]['seq'] + '/referenceDataList'
          });
        }
        if (classInfo[i]['selectMenu'].includes('QnA')) {
          pageData.push({
            pageName: 'Q/A',
            href: '/class/' + classInfo[i]['seq'] + '/QnA'
          });
        }
        let data = {
          classIdx: classInfo[i]['seq'],
          title: classInfo[i]['name'],
          pageList: pageData
        };
        result.push(data);
      }
      setClassList(result);
    }
  }

  useEffect(()=>{
  },[progressBarState]);

  useEffect(()=>{
    //토큰 테스트
    const user = {
      id: 'dlwodyd202',
      pass: 'dlwodyd'
    };
    Oauth.getAccessToken(user);
    axiosGet.getNotContainsData('/api/professor/class', getResponse);
  }, []);

  useEffect(() => {
    dispatch(RedirectActions.isRedirect(false));
  }, [isRedirect]);

  useEffect(() => {
    if (isSideBarUpdate) {
      axiosGet.getNotContainsData('/api/professor/class', getResponse);
      dispatch(SideBarActions.isUpdate(false));
    }
  }, [isSideBarUpdate]);

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
        treeMenu={true}
      />
      <main className={classes.content}>
        {
          progressBarState ? (
            <Backdrop className={classes.backdrop} open={open}>
              <CircularProgress color="inherit"/>
            </Backdrop>
          )
          :
            null
        }
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

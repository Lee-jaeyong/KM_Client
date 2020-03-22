import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import { Sidebar, Topbar, Footer } from '@common/component';
import * as RedirectActions from '@store/actions/RedirectActions';
import CustomMessageBox from '@common/component/CustomMessageBox';

import {Redirect} from 'react-router-dom';

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
  }
}));

const Main = props => {
  const [userInfo,setUserInfo] = useState({
    name : '이재용',
    subject : '융합소프트웨어',
    userImg : '/images/dlwodyd.jpg'
  });

  const [classList,setClassList] = useState(
    [
      {
        classIdx:1,
        title: '자바',
        pageList : [
          {pageName:"과제 등록",href:"/class/"+1+"/report/add"},
          {pageName:"과제 목록",href:"/class/"+1+"/reportList"},
          {pageName:"참고자료 등록",href:"/class/"+1+"/referenceData/add"},
          {pageName:"참고자료 목록",href:"/class/"+1+"/referenceDataList"},
          {pageName:"공지사항 등록",href:"/class/"+1+"/notice/add"},
          {pageName:"공지사항 목록",href:"/class/"+1+"/noticeList"},
          {pageName:"Q/A",href:"/class/"+7+"/QnA"},
        ]
      },
      {
        classIdx:2,
        title: 'C언어',
        pageList : [
          {pageName:"과제 등록",href:"/class/"+2+"/report/add"},
          {pageName:"과제 목록",href:"/class/"+2+"/reportList"},
          {pageName:"Q/A",href:"/class/"+7+"/QnA"},
        ]
      },
      {
        classIdx:3,
        title: '스프링 프레임워크',
        pageList : [
          {pageName:"과제 등록",href:"/class/"+3+"/report/add"},
          {pageName:"과제 목록",href:"/class/"+3+"/reportList"},
          {pageName:"참고자료 등록",href:"/class/"+3+"/referenceData/add"},
          {pageName:"참고자료 목록",href:"/class/"+3+"/referenceDataList"},
        ]
      },
      {
        classIdx:4,
        title: 'JPA',
        pageList : [
          {pageName:"과제 등록",href:"/class/"+4+"/report/add"},
          {pageName:"과제 목록",href:"/class/"+4+"/reportList"},
        ]
      },
      {
        classIdx:5,
        title: '운영체제',
        pageList : [
          {pageName:"과제 등록",href:"/class/"+5+"/report/add"},
          {pageName:"과제 목록",href:"/class/"+5+"/reportList"},
          {pageName:"참고자료 등록",href:"/class/"+5+"/referenceData/add"},
          {pageName:"참고자료 목록",href:"/class/"+5+"/referenceDataList"},
          {pageName:"Q/A",href:"/class/"+7+"/QnA"},
        ]
      },
      {
        classIdx:6,
        title: '시스템 설계 분석',
        pageList : [
          {pageName:"과제 등록",href:"/class/"+2+"/report/add"},
          {pageName:"과제 목록",href:"/class/"+2+"/reportList"},
          {pageName:"Q/A",href:"/class/"+7+"/QnA"},
        ]
      },
      {
        classIdx:7,
        title: 'React',
        pageList : [
          {pageName:"과제 등록",href:"/class/"+7+"/report/add"},
          {pageName:"과제 목록",href:"/class/"+7+"/reportList"},
          {pageName:"참고자료 등록",href:"/class/"+7+"/referenceData/add"},
          {pageName:"참고자료 목록",href:"/class/"+7+"/referenceDataList"},
          {pageName:"공지사항 등록",href:"/class/"+7+"/notice/add"},
          {pageName:"공지사항 목록",href:"/class/"+7+"/noticeList"},
          {pageName:"Q/A",href:"/class/"+7+"/QnA"},
        ]
      },
      {
        classIdx:8,
        title: '데이터베이스',
        pageList : [
          {pageName:"과제 등록",href:"/class/"+8+"/report/add"},
          {pageName:"과제 목록",href:"/class/"+8+"/reportList"},
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
        href:'/settings'
      },
    ]
  );

  const { children } = props;
  const isRedirect = useSelector(state=>state['Redirect']['redirect']['isRedirect']);
  const redirectURL = useSelector(state=>state['Redirect']['redirect']['url']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  useEffect(()=>{
    dispatch(RedirectActions.isRedirect(false));
  },[isRedirect]);

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
        userInfo={userInfo}
        classList={classList}
        otherPage={otherPage}
      />
      <main className={classes.content}>
        {children}
        {isRedirect ? <Redirect to={redirectURL}/> : null}
        <CustomMessageBox/>
        <Footer />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;

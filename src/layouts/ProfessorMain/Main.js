import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import { Sidebar, Topbar, Footer } from '@common/component';
import * as RedirectActions from '@store/actions/RedirectActions';

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
    subject : '융합소프트웨어'
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
          {pageName:"공지사항 등록",href:"/class/"+1+"/referenceData/add"},
          {pageName:"공지사항 목록",href:"/class/"+1+"/referenceDataList"},
          {pageName:"Q/A",href:"/class/"+1+"/referenceData/add"},
        ]
      },
      {
        classIdx:2,
        title: 'C언어',
        pageList : [
          {pageName:"과제 등록",href:"/class/"+2+"/report/add"},
          {pageName:"과제 목록",href:"/class/"+2+"/reportList"},
          {pageName:"Q/A",href:"/icons/9"}
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
        <Footer />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;

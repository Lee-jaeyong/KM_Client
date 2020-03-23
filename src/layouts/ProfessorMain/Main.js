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

import * as axiosGet from '@axios/get';

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

  const [classList,setClassList] = useState([]);

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

  function getResponse (res){
    if(res.length > 0){
      let result = [];
      for(let i =0;i<res.length;i++){
        let pageData = []
        if(res[i]['selectMenu'].includes('REPORT')){
          pageData.push({
            pageName:"과제 등록",
            href:"/class/"+res[i]['seq']+"/report/add",
          });
          pageData.push({
            pageName:"과제 목록",
            href:"/class/"+res[i]['seq']+"/reportList",
          });
        }
        let data = {
          classIdx : res[i]['seq'],
          title : res[i]['name'],
          pageList : pageData
        };
        result.push(data);
      }
      setClassList(result);
    }
  }

  useEffect(()=>{
    axiosGet.getNotContainsData("/professor/class",getResponse);
    alert('fds');
  },[]);

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

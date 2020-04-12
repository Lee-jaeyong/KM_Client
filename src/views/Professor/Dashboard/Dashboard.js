import React, { useEffect, useState,useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import SockJsClient from 'react-stomp';

import { useDispatch, useSelector } from 'react-redux';
import client from 'react-stomp';
import { TalkBox } from "react-talk";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [clientRef,setClientRef] = useState();
  const storeData = useSelector(state => state['messageState']);
  const [prevStoreData, setPrevStoreData] = useState(storeData); 
  const [playState,setPlayState] = useState();
  const [chatConn,setChatConn] = useState(false);

  useEffect(() => {

  }, []);

  const drawImg = (img) => {
    console.log(img);
    document.getElementById("imgSource").innerHTML = '<img src="'+img+'"/>';
  }

  useEffect(() => {
    if (prevStoreData !== storeData) {
      setPrevStoreData(storeData);
    }
  }, [storeData]);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs></Grid>
        <Grid item xs>
          {/* <input onChange={(e)=>}/> */}
          <canvas id="serverImg"/>
          <div id="imgSource">
          </div>
          {/* <img src="/images/kyunminMain.png" style={{ width: 1000 }} /> */}
          <SockJsClient
            url="http://localhost:8090/chat"
            topics={["/topics/video/ABCDEFG"]}
            onMessage={(msg) => { drawImg(msg)}}
            ref={(ref)=>{setClientRef(ref)}}
          />
          {/* <SockJsClient
            url="http://localhost:8090/chat"
            topics={["/topics/testchat/1"]}
            onConnect={ () => { setChatConn(true)} }
            onDisconnect={ () => { setChatConn(false)} }
            ref={(ref)=>{setClientRef(ref)}}
            /> */}
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

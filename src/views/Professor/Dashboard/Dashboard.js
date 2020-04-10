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
  const dispatch = useDispatch();
  const storeData = useSelector(state => state['messageState']);
  const [prevStoreData, setPrevStoreData] = useState(storeData); 
  const [playState,setPlayState] = useState();
  const [chatConn,setChatConn] = useState(false);

  useEffect(() => {
    let constraints = {
      video:true,
      audio : false
    }
    let realTimeImg = document.getElementById('realTimeImg');
    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
      realTimeImg.srcObject = stream;
      realTimeImg.play();
    });
  }, []);

  const sendMessage = (msg) => {
      const s = {name: "이재용", session: "0", content: msg}
      clientRef.sendMessage("/app/hello", JSON.stringify(s));
  }

  const play = () => {
    setPlayState(setInterval(() => {
      let video = document.getElementById('realTimeImg');
      var canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')
            .drawImage(video, 0, 0, canvas.width, canvas.height);
      sendMessage(canvas.toDataURL('image/jpeg'));
    }, 100));
  }

  const noPlay = () =>{
    clearInterval(playState);
    setPlayState(null);
  }

  const drawImg = (img) => {
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
        <button onClick={()=>play()}>클릭</button>
        <button onClick={()=>noPlay()}>중지</button>
        <Grid item xs></Grid>
        <Grid item xs>
          <video id="realTimeImg"/>
          <canvas id="serverImg"/>
          <div id="imgSource">
          </div>
          {/* <img src="/images/kyunminMain.png" style={{ width: 1000 }} /> */}
          <SockJsClient
            url="http://localhost:8090/chat"
            topics={["/topics/testchat"]}
            onMessage={(msg) => { drawImg(msg)}}
            onConnect={ () => { setChatConn(true)} }
            onDisconnect={ () => { setChatConn(false)} }
            ref={(ref)=>{setClientRef(ref)}}
            />
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

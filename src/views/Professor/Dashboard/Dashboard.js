import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Avatar, Typography } from '@material-ui/core';

import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';

import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const storeData = useSelector(state=>state['messageState']);
  const [prevStoreData,setPrevStoreData] = useState(storeData);
  
  useEffect(()=>{
      let a = {
        content : '이재용',
        level:'error'
      }
      dispatch(SHOW_MESSAGE_ACTION.show_message(a));
    },[]);
    
  useEffect(()=>{
    if(prevStoreData !== storeData)
    {
      setPrevStoreData(storeData);
    }
  },[storeData]);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid item xs>
        </Grid>
        <Grid item xs>
          <img src="/images/kyunminMain.png" style={{width:1000}}/>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

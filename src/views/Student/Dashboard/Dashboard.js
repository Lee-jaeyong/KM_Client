import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import CustomJumbotron from '@common/component/CustomJumbotron';
import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const storeData = useSelector(state => state['messageState']);
  const [prevStoreData, setPrevStoreData] = useState(storeData);
  const [testContents, setTestContents] = useState(
    '수업내용의 앞 부분입니다 이건 엄청 길지않아요 한 20자정도?//////수업내용의 뒷 부분입니다 이건 엄청 길어서 숨겨져있어요ㅎㅎㅎㅎ'
  );

  useEffect(() => {}, []);

  useEffect(() => {
    if (prevStoreData !== storeData) {
      setPrevStoreData(storeData);
    }
  }, [storeData]);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <CustomJumbotron
            plusContents={testContents.substr(41)}
            prevContents={testContents.substr(0, 40)}
            professor="이재용"
            title="JAVA 활용"
          />
        </Grid>

        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

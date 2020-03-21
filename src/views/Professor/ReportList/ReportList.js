import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import CustomSearchHeader from '@common/component/CustomSearchHeader';
import CustomTable from '@common/component/CustomTable';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));


const ReportList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <br></br>
      <CustomSearchHeader title="과제 검색"/>
      <div>
        <br></br>
        <br></br>
      </div>
      <CustomTable/>
    </div>
  );
};

export default ReportList;

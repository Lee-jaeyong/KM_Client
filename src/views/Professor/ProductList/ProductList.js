import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import mockData from './data';

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


const ProductList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h3>과제 목록</h3><br/>
      <hr/>
      <br></br>
      <CustomSearchHeader/>
      <div>
        <br></br>
        <br></br>
      </div>
      <CustomTable/>
    </div>
  );
};

export default ProductList;

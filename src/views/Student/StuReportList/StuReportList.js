import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import CustomTable from '@common/component/CustomTable';
import { useDispatch } from 'react-redux';
import * as RedirectActions from '@store/actions/RedirectActions';
import CustomSearchHeader from '@common/component/CustomSearchHeader';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const StuReportList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  function mockButton() {
    dispatch(RedirectActions.isRedirect(true, '/stu/main'));
  }

  return (
    <div className={classes.root}>
      <CustomSearchHeader title="과제 검색" />
      <br />
      <CustomTable rowClickHandle={mockButton} />
      <br />
      <Button
        color="primary"
        onClick={() => {
          mockButton();
        }}
        variant="outlined"
      >
        행 클릭시 해당과제보기 ("/view/report")
      </Button>
    </div>
  );
};

export default StuReportList;

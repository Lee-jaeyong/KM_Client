import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';

import CustomTable from '@common/component/CustomTable';
import CustomConfirmDialog from '@common/component/CustomConfirmDialog';
import * as RedirectActions from '@store/actions/RedirectActions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  requireFont: {
    color: 'red'
  }
}));

const ReferenceDataInfo = (props) => {
  const classes = useStyles();
  const [confirmDialog,setConfirmDialog] = useState(false);
  const selectClassIdx = useSelector(state=>state['SelectUtil']['selectClass']['classIdx']);
  const dispatch = useDispatch();
  const redirectPage_updateClass = () => {
    dispatch(RedirectActions.isRedirect(true,"/class/"+props.match.params.idx+"/referenceData/update"));
  }

  useEffect(()=>{
  },[selectClassIdx]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <CustomConfirmDialog
          open={confirmDialog}
          closeHandle={()=>setConfirmDialog(false)}
          title={"참고자료 삭제"}
          content={"참고자료 삭제시 일주일(7일)간 보관됩니다. 정말 삭제하시겠습니까?"}  
        />
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan="4" align="center">
                    <h2>* 참고자료 정보</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <h2>제 목</h2>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    <TextField fullWidth variant="outlined" disabled/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>내 용</h2>
                    <br />
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>참고 이미지</h2>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <h2>참고 파일</h2>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="2">
                    <Button variant="contained" color="primary" fullWidth onClick={()=>redirectPage_updateClass()}>
                      참고자료 수정
                    </Button>
                  </TableCell>
                  <TableCell colSpan="2">
                    <Button variant="contained" color="secondary" fullWidth onClick={()=>setConfirmDialog(true)}>
                      참고자료 삭제
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReferenceDataInfo;

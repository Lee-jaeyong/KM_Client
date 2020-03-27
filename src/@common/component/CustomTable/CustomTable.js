import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function getJSONKeyList(jsonData){
  let jsonKeyList = new Array();
  for(let key in jsonData[0]){
    if(key !== 'links')
      jsonKeyList.push(key);
  }
  return jsonKeyList;
}

const CustomTable = props => {
  const { tableDescription,noDataMessage,tableDataCount,searchSeq,exclude,tableDataList, tableHeaderList, ...rest } = props;
  //const [tableHeader,setTableHeader] = useState(["과제 번호","과제 코드","과제명","과제 시작일","과제 종료일","조회수"]);
  // const [tableData,setTableData] = useState([
  //   {reportIdx:"23" , reportCode:"C3523",reportTitle:"C언어-별짓기",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
  //   {reportIdx:"24" , reportCode:"C3524",reportTitle:"자바-별짓기",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
  //   {reportIdx:"25" , reportCode:"C3525",reportTitle:"파이썬-별짓기",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
  //   {reportIdx:"26" , reportCode:"C3526",reportTitle:"JPA",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
  //   {reportIdx:"27" , reportCode:"C3527",reportTitle:"스프링 프레임워크",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
  //   {reportIdx:"28" , reportCode:"C3528",reportTitle:"RESTAPI",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
  // ]);
  
  const [tableHeader,setTableHeader] = useState(tableHeaderList ? tableHeaderList : 
    []
  );

  const [tableData,setTableData] = useState(tableDataList ? tableDataList : 
    [{reportIdx:""}]
  );

  const [jsonDataKeyList,setJsonDataKeyList] = useState(getJSONKeyList(tableData));

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const getTableHeader = (headerList) => {
    return (
      <TableRow>
        {headerList.map((title,idx)=>{
          return (
            <TableCell>{title}</TableCell>
          );
        })}
      </TableRow>
    );
  }

  const getTableBody = (data,jsonKeyList,props) => {
    function tableCellClickHandle(){
      props.rowClickHandle(data['seq']);
    }
    return (
      <TableRow hover>
        {
          jsonKeyList.map((key,idx)=>{
            return (
              exclude !== undefined && exclude.indexOf(key) === -1 ? <TableCell style={{cursor:'pointer'}} onClick={()=>tableCellClickHandle()}>{data[key]}</TableCell> : null
            )
          })
        }
      </TableRow>
    );
  }

  const handlePageChange = (event, page) => {
    props.requestData(searchSeq,page,rowsPerPage);
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    props.requestData(searchSeq,0,event.target.value);
    setPage(0);
    setRowsPerPage(event.target.value);
  };

  useEffect(()=>{
    if(tableDataList !== undefined){
      setTableData(tableDataList);
      setJsonDataKeyList(getJSONKeyList(tableDataList));
    }
    console.log(tableDataList);
  },[tableDataList]);

  return (
    <Card
      {...rest}
    >
      <h3 style={{marginTop:10,marginBottom:10}}>&nbsp;<img src="/images/right_arrow.png"/> {tableDescription}</h3>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
              {
                getTableHeader(tableHeader)
              }
              </TableHead>
              <TableBody>
              {
                tableData.length !== 0 ?
                tableData.map((data,idx)=>{
                  return getTableBody(data,jsonDataKeyList,props) 
                }) : <TableRow><TableCell align="center" colSpan={tableHeader.length}>{noDataMessage}</TableCell></TableRow>
              }
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      {!rest['notPageInfo'] ? 
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={tableDataCount}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
      : null}
    </Card>
  );
};

CustomTable.propTypes = {
  tableDataList:PropTypes.array.isRequired,
  tableHeaderList:PropTypes.array.isRequired
};

export default CustomTable;

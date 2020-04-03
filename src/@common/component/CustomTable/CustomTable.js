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
  const { tableDescription,noDataMessage,tableDataCount,searchSeq,exclude,tableDataList, tableHeaderList,tableStyle, ...rest } = props;
  const deleteProps = Object.assign({},props);
  delete deleteProps.rowClickHandle;
  delete deleteProps.tableDescription;
  delete deleteProps.tableHeaderList;
  delete deleteProps.tableDataList;
  delete deleteProps.noDataMessage;
  delete deleteProps.notPageInfo;
  delete deleteProps.tableStyle;
  delete deleteProps.tableDataCount;
  delete deleteProps.searchSeq;
  delete deleteProps.requestData;

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
            <TableCell key={idx} align="center">{title}</TableCell>
          );
        })}
      </TableRow>
    );
  }

  const getTableBody = (idx,data,jsonKeyList,props) => {
    function tableCellClickHandle(){
      props.rowClickHandle(data['seq']);
    }
    return (
      <TableRow key={idx} hover>
        {
          jsonKeyList.map((key,idx)=>{
            return (
              exclude !== undefined && exclude.indexOf(key) === -1 ? <TableCell key={idx} align="center" style={{cursor:'pointer'}} onClick={()=>tableCellClickHandle()}>{data[key]}</TableCell> : null
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
  },[tableDataList]);

  return (
    <Card
      {...deleteProps}
    >
      <h3 style={{marginTop:10,marginBottom:10}}>&nbsp;<img src="/images/right_arrow.png"/> {tableDescription}</h3>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner} style={tableStyle}>
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
                  return getTableBody(idx,data,jsonDataKeyList,props) 
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
          count={tableDataCount ? tableDataCount : 0}
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

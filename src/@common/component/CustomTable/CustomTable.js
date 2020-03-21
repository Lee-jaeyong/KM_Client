import React, { useState } from 'react';
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
    jsonKeyList.push(key);
  }
  return jsonKeyList;
}

const CustomTable = props => {
  const { tableDataList, tableHeaderList, ...rest } = props;

  const [tableHeader,setTableHeader] = useState([<input type="checkBox"/>,"과제 번호","과제 코드","과제명","과제 시작일","과제 종료일","조회수"]);
  const [tableData,setTableData] = useState([
    {checkBox:<input type="checkBox"/>, reportIdx:"23" , reportCode:"C3523",reportTitle:"C언어-별짓기",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
    {checkBox:<input type="checkBox"/>, reportIdx:"24" , reportCode:"C3524",reportTitle:"자바-별짓기",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
    {checkBox:<input type="checkBox"/>, reportIdx:"25" , reportCode:"C3525",reportTitle:"파이썬-별짓기",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
    {checkBox:<input type="checkBox"/>, reportIdx:"26" , reportCode:"C3526",reportTitle:"JPA",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
    {checkBox:<input type="checkBox"/>, reportIdx:"27" , reportCode:"C3527",reportTitle:"스프링 프레임워크",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
    {checkBox:<input type="checkBox"/>, reportIdx:"28" , reportCode:"C3528",reportTitle:"RESTAPI",reportStartDate:"2020-03-20",reportEndDate:"2020-07-17",reportHit:"343"},
  ]);
  
  // const [tableHeader,setTableHeader] = useState(tableHeaderList);
  // const [tableData,setTableData] = useState(tableDataList);

  const [jsonDataKeyList,setJsonDataKeyList] = useState(getJSONKeyList(tableData));

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
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

  const getTableBody = (data,jsonKeyList) => {
    return (
      <TableRow hover>
        {
          jsonKeyList.map((key,idx)=>{
            if(idx !== 0)
              return (
                <TableCell style={{cursor:'pointer'}} onClick={()=>alert('fds')}>{data[key]}</TableCell>
              )
            else
              return (
                <TableCell>{data[key]}</TableCell>
              )
          })
        }
      </TableRow>
    );
  }

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }
    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
    >
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
                tableData.map((data,idx)=>{
                  return getTableBody(data,jsonDataKeyList) 
                })
              }
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={tableData.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

CustomTable.propTypes = {
  tableDataList:PropTypes.array.isRequired,
  tableHeaderList:PropTypes.array.isRequired
};

export default CustomTable;

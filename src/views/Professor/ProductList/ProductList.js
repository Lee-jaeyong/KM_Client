import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';

import { ProductsToolbar, ProductCard } from './components';
import mockData from './data';


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

const CustomSerachPanel = (props) => {
  return (
    <ExpansionPanel expanded={true}>
      <ExpansionPanelSummary>
        <Typography>검 색</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <Table size='medium'>
            <TableBody>
              <TableRow>
                <TableCell>
                  <h3>과제명 :</h3> 
                </TableCell>
                <TableCell style={{minWidth:300}}>
                  <TextField/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h3>과제명 :</h3> 
                </TableCell>
                <TableCell style={{minWidth:300}}>
                  <TextField/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h3>과제명 :</h3> 
                </TableCell>
                <TableCell style={{minWidth:300}}>
                  <TextField/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const ProductList = () => {
  const classes = useStyles();

  const [products] = useState(mockData);

  return (
    <div className={classes.root}>
      <ProductsToolbar />
      {/* <br></br>
      <br></br>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {products.map(product => (
            <Grid
              item
              key={product.id}
              lg={4}
              md={6}
              xs={12}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div> */}
    </div>
  );
};

export default ProductList;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import Grid from '@material-ui/core/Grid';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const currencies = [
  {
    value: '',
    label: '선 택'
  },
  {
    value: 'name',
    label: '과제명'
  }
];

const useStyles = makeStyles(theme => ({
  containerRoot: {
    flexGrow: 1
  },
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

const CustomSearchHeader = props => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState('panel1');

  const { className, style, ...rest } = props;

  const [searchInput, setSearchInput] = useState({
    name: '',
    searchType: '',
    startDate: '',
    endDate: ''
  });

  const classes = useStyles();

  const [currency, setCurrency] = useState('선 택');

  const inputOnChange = event => {
    setSearchInput({
      ...searchInput,
      [event.target.name]: event.target.value
    });
  };

  const showMessageBox = (title, level, visible) => {
    let message = {
      content: title,
      level: level,
      visible: visible
    };
    dispatch(SHOW_MESSAGE_ACTION.show_message(message));
  };

  const searchClick = () => {
    if (searchInput['name'] !== '' && searchInput['searchType'] === '') {
      showMessageBox('검색 조건을 선택해주세요', 'error', true);
      return;
    }
    props.searchHandle(searchInput);
  };

  const initialValue = () => {
    let initValue = {
      name: '',
      searchType: '',
      startDate: '',
      endDate: ''
    };
    setSearchInput(initValue);
    props.searchHandle(initValue);
  };

  return (
    <ExpansionPanel square expanded={expanded === 'panel1'}>
      <ExpansionPanelSummary
        aria-controls="panel1d-content"
        id="panel1d-header">
        <Typography>
          <h3>== {props.title} == </h3>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.containerRoot}>
          <Grid container spacing={1}>
            <Grid item xs={10} sm={3}>
              <Paper className={classes.paper}>
                <TextField
                  {...rest}
                  label="검 색"
                  defaultValue=""
                  name="name"
                  value={searchInput['name']}
                  className={classes.input}
                  disableUnderline
                  onChange={event => inputOnChange(event)}
                  fullWidth
                />
              </Paper>
            </Grid>
            <Grid item xs={2} sm={1}>
              <Paper className={classes.paper}>
                <TextField
                  select
                  label="선 택"
                  value={currency}
                  name="searchType"
                  value={searchInput['searchType']}
                  onChange={event => inputOnChange(event)}
                  fullWidth>
                  {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Paper className={classes.paper}>
                <TextField
                  id="date"
                  type="date"
                  label="시작일"
                  name="startDate"
                  value={searchInput['startDate']}
                  onChange={event => inputOnChange(event)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Paper className={classes.paper}>
                <TextField
                  id="date"
                  type="date"
                  label="종료일"
                  name="endDate"
                  value={searchInput['endDate']}
                  onChange={event => inputOnChange(event)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Paper className={classes.paper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={searchClick}
                  fullWidth>
                  검&nbsp;&nbsp;&nbsp;&nbsp;색
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Paper className={classes.paper}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={initialValue}
                  fullWidth>
                  초기화
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default CustomSearchHeader;

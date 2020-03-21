import React, { useState } from 'react';
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
    value: 'reportTitle',
    label: '과제명'
  },
  {
    value: 'reportCode',
    label: '과제 코드'
  }
];

const useStyles = makeStyles(theme => ({
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
  }
}));

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

const CustomSearchHeader = props => {
  const [expanded, setExpanded] = React.useState('panel1');

  const { className, onChange, style, ...rest } = props;

  const classes = useStyles();

  const [currency, setCurrency] = useState('선 택');

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  return (
    <ExpansionPanel square expanded={expanded === 'panel1'}>
      <ExpansionPanelSummary
        aria-controls="panel1d-content"
        id="panel1d-header">
        <Typography><h3>== {props.title} == </h3></Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <TextField
            {...rest}
            label="검 색"
            defaultValue=""
            className={classes.input}
            disableUnderline
            onChange={onChange}
            defaultValue={'검 색'}
            style={{ minWidth: 300 }}
          />
          <TextField
            select
            label="선 택"
            value={currency}
            onChange={handleChange}
            style={{ marginLeft: 20, minWidth: 150 }}>
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="date"
            type="date"
            label="시작일"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginLeft: 20, minWidth: 200 }}
          />
          <TextField
            id="date"
            type="date"
            label="종료일"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            style={{
              marginLeft: 10,
              minWidth: 200
            }}
          />
          <Button
            style={{ minWidth: 200, marginLeft: 250 }}
            variant="contained"
            color="primary">
            검&nbsp;&nbsp;&nbsp;&nbsp;색
          </Button>
          <Button
            style={{ minWidth: 200, marginLeft: 20 }}
            variant="contained"
            color="secondary">
            초기화
          </Button>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default CustomSearchHeader;

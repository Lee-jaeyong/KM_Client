import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelList = withStyles({
    root: {
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        minWidth:150,
    },
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels(props) {
  const {className,page,...rest} = props;
  
  const [openPanelState,setOpenPanelState] = useState(false);
  const handleChange = () => {
    setOpenPanelState(!openPanelState);
  };
  return (
    rest['dropDown'] ? 
    <ExpansionPanel square expanded={openPanelState} onChange={()=>handleChange()}>
        <ExpansionPanelSummary aria-controls="panel1d-content">
        <Typography>
        <table>
          <tr>
            <td style={{width:100}}>{className}</td>
            <td>
            {openPanelState ? <img src={"/images/arrow_down.png"}/> : <img src={"/images/arrow_up.png"}/>}
            </td>
          </tr>
        </table>
        </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Typography>
            {page['pageList'].map((pageInfo,idx)=>
                <Link to={pageInfo['href']}>
                    <ExpansionPanelList>
                        <Typography>{pageInfo.pageName}</Typography>
                    </ExpansionPanelList>
                </Link>
            )}
            </Typography>
        </ExpansionPanelDetails>
    </ExpansionPanel>
    :
    <ExpansionPanel square expanded={openPanelState} onChange={()=>handleChange()}>
        <Link to={page['href']}>
          <ExpansionPanelSummary aria-controls="panel1d-content">
            <Typography>{page['title']}</Typography>
          </ExpansionPanelSummary>
        </Link>
    </ExpansionPanel>
  );
}
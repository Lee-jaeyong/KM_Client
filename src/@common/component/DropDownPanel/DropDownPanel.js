import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import * as RedirectActions from '@store/actions/RedirectActions';
import * as SelectActions from '@store/actions/SelectActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';

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

const ExpansionPanelSummary_color_Gray = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    height: 60
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelSummary_color_White = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    height: 60
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelList = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    minWidth: 150
  }
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels(props) {
  const {className,page,...rest} = props;
   
  const [openPanelState,setOpenPanelState] = useState(false);
  const [chageColorState,setChangeColorState] = useState(false);
  const selectClassIdx = useSelector(state=>state['SelectUtil']['selectClass']['classIdx']);

  const dispatch = useDispatch();

  const selectClassMenu = (className) => {
    dispatch(SelectActions.selectClass(page['classIdx'],className));
  }

  const selectClassHandleChange = (className) => {
    window.scrollTo(0,0);
    if(selectClassIdx !== page['classIdx'])
    {
      dispatch(ProgressBarActions.isProgressBar(true));
      dispatch(RedirectActions.isRedirect(true,"/class/"+page['classIdx']));
      dispatch(SelectActions.selectClass(page['classIdx'],className));
    }
    setOpenPanelState(!openPanelState);
  };

  const pageHandleChange = () => {
    window.scrollTo(0, 0);
    dispatch(SelectActions.selectClass(-1));
  };

  return (
    rest['dropDown'] ? (
    <div onMouseOver={()=>setChangeColorState(true)} onMouseLeave={()=>setChangeColorState(false)}>
      {chageColorState ? 
      (
        <ExpansionPanel square expanded={openPanelState} onChange={()=>selectClassHandleChange(className)}>
            <ExpansionPanelSummary_color_Gray aria-controls="panel1d-content">
            <Typography>
              <table>
                <tr>
                  <td style={{ width: 100 }}>
                    <h4>- {className}</h4>
                  </td>
                  <td>
                    {openPanelState ? (
                      <img src={'/images/arrow_up.png'} />
                    ) : (
                      <img src={'/images/arrow_down.png'} />
                    )}
                  </td>
                </tr>
              </table>
            </Typography>
            </ExpansionPanelSummary_color_Gray>
            <ExpansionPanelDetails style={{marginLeft:0}}>
                <Typography>
                {page['pageList'].map((pageInfo,idx)=>
                    <Link onClick={()=>selectClassMenu(className)} to={pageInfo['href']}>
                        <ExpansionPanelList onClick={()=>window.scrollTo(0,0)}>
                            <Typography>- {pageInfo.pageName}</Typography>
                        </ExpansionPanelList>
                    </Link>
                )}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
      ) : (
        <ExpansionPanel
          expanded={openPanelState}
          onChange={() => selectClassHandleChange()}
          square
        >
          <ExpansionPanelSummary_color_White aria-controls="panel1d-content">
            <Typography>
              <table>
                <tr>
                  <td style={{ width: 100 }}>
                    <h4>- {className}</h4>
                  </td>
                  <td>
                    {openPanelState ? (
                      <img src={'/images/arrow_up.png'} />
                    ) : (
                      <img src={'/images/arrow_down.png'} />
                    )}
                  </td>
                </tr>
              </table>
            </Typography>
            </ExpansionPanelSummary_color_White>
            <ExpansionPanelDetails style={{marginLeft:0}}>
                <Typography>
                {page['pageList'].map((pageInfo,idx)=>
                    <Link to={pageInfo['href']}>
                        <ExpansionPanelList>
                            <Typography>- {pageInfo.pageName}</Typography>
                        </ExpansionPanelList>
                    </Link>
                )}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </div>
  ) : (
    <ExpansionPanel
      onClick={() => pageHandleChange()}
      square
    >
      <Link to={page['href']}>
        <ExpansionPanelSummary_color_Gray aria-controls="panel1d-content">
          <Typography>{page['title']}</Typography>
        </ExpansionPanelSummary_color_Gray>
      </Link>
    </ExpansionPanel>
  ));
}

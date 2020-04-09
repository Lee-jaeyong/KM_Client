import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected,type } = props;

  return (
      <Toolbar
      className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
      })}
      >
      {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          </Typography>
      )}
      {type === 'signUpClassSuccess' ? 
      (
        <Tooltip title="수업 취소">
          <IconButton onClick={props['toolbarBtnHandle']}>
            <HighlightOffIcon/>
          </IconButton>
        </Tooltip>
      ) :
      (
        <Tooltip title="요청 승인">
          <IconButton onClick={props['toolbarBtnHandle']}>
           <LibraryAddIcon/>
          </IconButton>
        </Tooltip>
          )
        }
     </Toolbar>
  );
};
export default EnhancedTableToolbar;
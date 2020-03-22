import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    textAlign: 'center'
  },
  imgStyle: {
    // alignItems: 'center',
    // height: 751,
    // width: 1278
    maxWidth: '70%',
    height: 'auto',
    opacity: '0.7'
  }
}));

const StuMain = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.imgStyle}
        src="/images/kyunminMain.png"
      />
    </div>
  );
};

export default StuMain;

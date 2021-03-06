import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto'
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export default function TransferList({ handleChange,leftData,rightData }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(leftData ? leftData : []);
  const [right, setRight] = React.useState(rightData ? rightData : []);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const dataParse = (value) => {
    if(value === '공지사항')
        return 'NOTICE';
    else if(value === '참고자료')
        return 'REFERENCE';
    else if(value === 'Q/A')
        return 'QnA';
  }

  const handleAllRight = () => {
    let resultArray = [];
    let concatData = right.concat(left);
    for(let i =0;i<concatData.length;i++)
        resultArray.push(
            dataParse(concatData[i])
        );
    handleChange(right.concat(resultArray));
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    let resultArray = [];
    let concatData = right.concat(leftChecked);
    for(let i =0;i<concatData.length;i++)
        resultArray.push(dataParse(concatData[i]));
    handleChange(resultArray);
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    let resultArray = [];
    let concatData = left.concat(rightChecked);
    for(let i =0;i<concatData.length;i++)
        resultArray.push(
            dataParse(concatData[i])
        );
    handleChange(resultArray);
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    handleChange([]);
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = items => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-item-${value}-label`;

          return value !== '과제' ? (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          ) : <ListItem
          key={value}
          role="listitem"
          button
          onClick={handleToggle(value)}>
          <ListItemIcon>
            <Checkbox
              checked={true}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={`${value}`} />
        </ListItem>;
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}>
      <Grid item style={{textAlign:'center'}}>미적용<hr/>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right">
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right">
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left">
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left">
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item style={{textAlign:'center'}}>적 용<hr/>{customList(right)}</Grid>
    </Grid>
  );
}

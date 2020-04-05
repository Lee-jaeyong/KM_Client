import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)'
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent'
    }
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2)
    }
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit'
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1
  }
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;
  return (
    <TreeItem
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label
      }}
      label={
        <div className={classes.labelRoot}>
          <LabelIcon
            className={classes.labelIcon}
            color="inherit"
          />
          <Typography
            className={classes.labelText}
            variant="body2"
          >
            {labelText}
          </Typography>
          <Typography
            color="inherit"
            variant="caption"
          >
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400
  }
});

export default function GmailTreeView(props) {
  const { pages, student } = props;
  const classes = useStyles();
  const colorList = [
    { color: '#1a73e8', bgColor: '#e8f0fe' },
    { color: '#e3742f', bgColor: '#fcefe3' },
    { color: '#a250f5', bgColor: '#f3e8fd' },
    { color: '#3c8039', bgColor: '#e6f4ea' }
  ];

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultEndIcon={<div style={{ width: 30 }} />}
      defaultExpandIcon={<ArrowRightIcon />}
    >
      {pages.map((page, idx) => {
        return page['pageList'] ? (
          <Link
            key={idx}
            to={
              student
                ? '/stu/class/' + page['classIdx']
                : '/class/' + page['classIdx']
            }
          >
            <StyledTreeItem
              labelIcon={Label}
              labelText={page['title']}
              nodeId={'' + idx}
            >
              {page['pageList'].map((pageInfo, _idx) => {
                return (
                  <Link
                    key={_idx}
                    to={pageInfo['href']}
                  >
                    <StyledTreeItem
                      bgColor={colorList[idx % colorList.length]['bgColor']}
                      color={colorList[idx % colorList.length]['color']}
                      key={_idx}
                      labelIcon={SupervisorAccountIcon}
                      labelInfo="<"
                      labelText={pageInfo['pageName']}
                      nodeId={pageInfo['href'] + '_' + _idx}
                    />
                  </Link>
                );
              })}
            </StyledTreeItem>
          </Link>
        ) : (
          <div key={idx}>
            <Divider />
            <Link to={page['href']}>
              <StyledTreeItem
                labelIcon={
                  page['title'] === '수업 등록' ? LocalOfferIcon : ForumIcon
                }
                labelText={page['title']}
                nodeId={'sub' + idx}
              />
            </Link>
          </div>
        );
      })}
    </TreeView>
  );
}

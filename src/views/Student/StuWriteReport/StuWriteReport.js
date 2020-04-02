import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Editor from 'tui-editor'; /* ES6 */
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import * as RedirectActions from '@store/actions/RedirectActions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6)
  },
  table: {
    height: 173
  },
  titleCell: {
    textAlign: 'center',
    backgroundColor: '#EBF7FF',
    width: '10%'
  },
  contentCell: {
    textAlign: 'center',
    width: '40%'
  }
}));

function createButton(iconClassName) {
  const button = document.createElement('button');

  button.className = 'custom-button';
  button.innerHTML = `<i class="${iconClassName}"></i>`;

  return button;
}

const StuWriteReport = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [instance, setInstance] = useState();

  useEffect(() => {
    setInstance(
      new Editor({
        el: document.querySelector('#editorSection'),
        initialEditType: 'wysiwyg',
        height: '300px',
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'divider',
          'ul',
          'ol',
          'table',
          // Using Option: Customize the last button
          {
            type: 'button',
            options: {
              el: createButton('last'),
              name: 'Custom Button 1',
              tooltip: 'Custom Bold',
              command: 'Bold'
            }
          }
        ]
      })
    );
  }, []);

  const showMessageBox = (title, level, visible) => {
    let message = {
      content: title,
      level: level,
      visible: visible
    };
    dispatch(SHOW_MESSAGE_ACTION.show_message(message));
  };

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table
          aria-label="a dense table"
          className={classes.table}
          size="small"
        >
          <TableBody>
            <TableRow>
              <TableCell className={classes.titleCell}>수업명</TableCell>
              <TableCell className={classes.contentCell}>Spring 기초</TableCell>
              <TableCell className={classes.titleCell}>담당 교수</TableCell>
              <TableCell className={classes.contentCell}>박남일</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.titleCell}>시작 날짜</TableCell>
              <TableCell className={classes.contentCell}>2020-03-01</TableCell>
              <TableCell className={classes.titleCell}>마감 날짜</TableCell>
              <TableCell className={classes.contentCell}>2020-03-08</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.titleCell}>파일 업로드</TableCell>
              <TableCell
                className={classes.contentCell}
                colSpan="3"
                style={{ textAlign: 'left' }}
              >
                <input type="file" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.titleCell}>이미지 업로드</TableCell>
              <TableCell
                className={classes.contentCell}
                colSpan="3"
                style={{ textAlign: 'left' }}
              >
                <input type="file" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <Grid container>
        <Grid
          sm={12}
          xs={6}
        >
          <Paper
            className={classes.paper}
            style={{ minHeight: 105 }}
          >
            <div id="editorSection" />
          </Paper>
        </Grid>
        <Grid xs={5} />
        <Grid
          sm={2}
          xs={12}
        >
          <br />
          <Button
            color="primary"
            fullWidth
            onClick={() => {
              dispatch(
                RedirectActions.isRedirect(
                  true,
                  '/stu/class/' +
                    props.match.params.classidx +
                    '/reportView/' +
                    props.match.params.reportidx
                )
              );
            }}
            variant="contained"
          >
            제출하기
          </Button>
        </Grid>
        <Grid xs={5} />
      </Grid>
    </div>
  );
};

export default StuWriteReport;

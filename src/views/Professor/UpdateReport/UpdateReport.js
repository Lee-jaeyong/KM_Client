import React,{useEffect,useState,useRef} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';

import Editor from 'tui-editor'; /* ES6 */
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  requireFont : {
    color:'red'
  }
}));

function createButton(iconClassName) {
  const button = document.createElement('button');

  button.className = 'custom-button';
  button.innerHTML = `<i class="${iconClassName}"></i>`;

  return button;
}

const UpdateReport = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    submitCheck:false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(()=>{
    const instance = new Editor({
      el: document.querySelector('#editorSection'),
      initialEditType: 'markdown',
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
    });
  },[]);

  return (
    <div className={classes.root}>
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan="4" align="center"><h1>* 과 제 수 정</h1></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center"><h2>과제명</h2><span className={classes.requireFont}>*필수 입력 값입니다</span></TableCell>
                  <TableCell colSpan="3" align="left"><TextField fullWidth variant="outlined" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>과제 시작일</h2><span className={classes.requireFont}>*필수 입력 값입니다</span></TableCell>
                  <TableCell align="left"><TextField fullWidth type="date" variant="outlined" /></TableCell>
                  <TableCell align="center"><h2>과제 마감일</h2><span className={classes.requireFont}>*필수 입력 값입니다</span></TableCell>
                  <TableCell align="left"><TextField fullWidth type="date" variant="outlined" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>참고 이미지 등록</h2><br/>
                  </TableCell>
                  <TableCell colSpan="3" align="left"><input type="file"/></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>참고 파일 등록</h2><br/>
                  </TableCell>
                  <TableCell colSpan="3" align="left"><input type="file"/></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>마감 이후 제출 가능 여부</h2></TableCell>
                  <TableCell colSpan="3" align="left">
                    <RadioGroup row aria-label="position">
                      <FormControlLabel
                        value="가능"
                        control={<Radio color="primary" checked/>}
                        label="가능"
                      />
                      <FormControlLabel
                        value="불가"
                        control={<Radio color="primary" />}
                        label="불가"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>과제 내용</h2></TableCell>
                  <TableCell colSpan="3" align="center">
                    <div id="editorSection"></div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>학생 제출 과제 공개 상태</h2></TableCell>
                  <TableCell colSpan="3" align="left">
                    <RadioGroup row aria-label="position">
                      <FormControlLabel
                        value="공개"
                        control={<Radio color="primary" checked/>}
                        label="공개"
                      />
                      <FormControlLabel
                        value="미공개"
                        control={<Radio color="primary" />}
                        label="미공개"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="4" align="center">
                    <FormControlLabel
                      control={<Checkbox checked={state.submitCheck} onChange={handleChange} name="submitCheck" />}
                      label="입력한 대로 과제를 수정합니다."
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="4" align="right">
                    <Button variant="contained" color="primary" fullWidth style={{minHeight:70}}>
                      과제 수정
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
    </div>
  );
};

export default UpdateReport;

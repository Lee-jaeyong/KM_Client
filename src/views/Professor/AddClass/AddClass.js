import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';

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
import FormControl from '@material-ui/core/FormControl';

import Editor from 'tui-editor'; /* ES6 */
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import FormGroup from '@material-ui/core/FormGroup';
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import * as CLASS_ACTION from '@store/actions/ClassActions';
import * as RedirectActions from '@store/actions/RedirectActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';
import * as SideBarActions from '@store/actions/SideBarActions';
import { compareToDate } from '@common/functions/CompareToDate';

import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
 
import * as axiosPost from '@axios/post';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  requireFont: {
    color: 'red'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

function createButton(iconClassName) {
  const button = document.createElement('button');

  button.className = 'custom-button';
  button.innerHTML = `<i class="${iconClassName}"></i>`;

  return button;
}

const AddClass = () => {
  const dispatch = useDispatch();

  const name = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const [instance, setInstance] = useState();

  const classes = useStyles();
  const [state, setState] = React.useState({
    REPORT: true,
    NOTICE: false,
    REFERENCE: false,
    QnA: false,
    submitCheck: false
  });

  const [checkedMenuResult, setCheckedMenuResult] = useState([]);
  const [classFileUpload, setClassFileUpload] = useState();
  const [inputClassInfo, setInputClassInfo] = useState({
    name: '',
    startDate: '',
    endDate: '',
    type: 'MAJOR',
    content: '',
    replyPermit_state: 'YSE',
    use_state: 'YSE',
    selectMenu: 'REPORT,'
  });

  const inputChangeHandle = event => {
    const updateClassInfo = {
      ...inputClassInfo,
      [event.target.name]: event.target.value
    };
    setInputClassInfo(updateClassInfo);
  };

  const fileUploadHandle = event => {
    let _fileLen = event.target.value.length;
    let _lastDot = event.target.value.lastIndexOf('.');
    let _fileExt = event.target.value
      .substring(_lastDot, _fileLen)
      .toLowerCase();
    if (_fileExt !== '.xlsx') {
      event.target.value = '';
      setClassFileUpload(null);
      dispatch(
        SHOW_MESSAGE_ACTION.show_message({
          content: '엑셀 형식만 업로드 가능합니다.',
          visible: true
        })
      );
      return;
    }
    setClassFileUpload(event.target.files[0]);
  };

  const handleChange = event => {
    let menuArr = checkedMenuResult;
    if (event.target.checked) {
      menuArr.push(event.target.value);
    } else {
      menuArr.splice(menuArr.indexOf(event.target.value), 1);
    }
    setCheckedMenuResult(menuArr);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const addClassSubmit = event => {
    event.preventDefault();
    if (name.current.value === '') {
      showMessageBox('수업명을 입력해주세요.', '', true);
      name.current.focus();
      return;
    } else if (startDate.current.value === '') {
      showMessageBox('수업 시작일을 선택해주세요.', '', true);
      startDate.current.focus();
      return;
    } else if (endDate.current.value === '') {
      showMessageBox('수업 종료일을 선택해주세요.', '', true);
      endDate.current.focus();
      return;
    } else if (!state['submitCheck']) {
      showMessageBox('동의란을 체크해주세요.', '', true);
      return;
    }
    dispatch(ProgressBarActions.isProgressBar(true));
    setTimeout(() => {
      let addClassInfo = {
        ...inputClassInfo
      };
      let classMenuSelect = 'REPORT,';
      for (let i = 0; i < checkedMenuResult.length; i++) {
        classMenuSelect += checkedMenuResult[i] + ',';
      }
      addClassInfo = {
        ...inputClassInfo,
        selectMenu: classMenuSelect,
        content: instance.getHtml()
      };
      axiosPost.postContainsData('/api/professor/class', getResponse, addClassInfo);
    }, 1000);
  };

  const getResponse = res => {
    dispatch(CLASS_ACTION.save_class(res));
    if (classFileUpload !== null && classFileUpload !== undefined) {
      let formData = new FormData();
      formData.append('file', classFileUpload);
      axiosPost.postFileUpload(
        '/api/professor//uploadFile/' + res.seq + '/classInfoExcel',
        getFileResponse,
        formData
      );
    }
    showMessageBox('수업 등록 완료', '', true);
    dispatch(RedirectActions.isRedirect(true, '/class/' + res.seq));
    dispatch(SideBarActions.isUpdate(true));
    window.scrollTo(0, 0);
  };

  const showMessageBox = (title, level, visible) => {
    let message = {
      content: title,
      level: level,
      visible: visible
    };
    dispatch(SHOW_MESSAGE_ACTION.show_message(message));
  };

  const getFileResponse = res => {
    dispatch(CLASS_ACTION.fileUpload_class(res['file']));
  };

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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid spacing={2} container>
          <Grid xs={12} sm={12}>
            <Paper className={classes.paper}>
              <h1>* 수 업 등 록</h1>
              <span className={classes.requireFont}>
                *5분마다 자동으로 임시저장 됩니다.
              </span>
            </Paper>
          </Grid>
          <Grid item container style={{ marginTop: 35 }}>
            <Grid xs={6} sm={4}>
                <h2>수업명</h2>
                <span className={classes.requireFont}>*필수 입력 값입니다</span>
            </Grid>
            <Grid xs={6} sm={8}>
                <TextField
                  inputRef={name}
                  fullWidth
                  variant="outlined"
                  name="name"
                  onChange={event => inputChangeHandle(event)}
                />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 35 }}>
            <Grid xs={6} sm={2}>
                <h2>수업 시작일</h2>
                <span className={classes.requireFont}>*필수 입력 값입니다</span>
            </Grid>
            <Grid xs={6} sm={4}>
                <TextField
                  inputRef={startDate}
                  fullWidth
                  type="date"
                  name="startDate"
                  onChange={event => {
                    if (inputClassInfo['endDate'] === '') {
                      inputChangeHandle(event);
                      return;
                    }
                    if (
                      inputClassInfo['endDate'] !== '' &&
                      compareToDate(
                        event.target.value,
                        inputClassInfo['endDate']
                      )
                    )
                      inputChangeHandle(event);
                    else {
                      showMessageBox(
                        '수업 시작일은 종료일보다 작아야합니다.',
                        'error',
                        true
                      );
                      startDate.current.value = '';
                    }
                  }}
                  variant="outlined"
                />
            </Grid>
            <Grid xs={6} sm={2}>
                <h2>수업 종료일</h2>
                <span className={classes.requireFont}>*필수 입력 값입니다</span>
            </Grid>
            <Grid xs={6} sm={4}>
                <TextField
                  inputRef={endDate}
                  fullWidth
                  type="date"
                  name="endDate"
                  onChange={event => {
                    {
                      if (inputClassInfo['startDate'] === '') {
                        inputChangeHandle(event);
                        return;
                      }
                      if (
                        inputClassInfo['startDate'] !== '' &&
                        compareToDate(
                          inputClassInfo['startDate'],
                          event.target.value
                        )
                      )
                        inputChangeHandle(event);
                      else {
                        showMessageBox(
                          '수업 종료일은 시작일보다 커야합니다.',
                          'error',
                          true
                        );
                        endDate.current.value = '';
                      }
                    }
                  }}
                  variant="outlined"
                />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 35 }}>
            <Grid xs={6} sm={4}>
                <h2>강의계획서 등록</h2>
                <br />
                <Button variant="contained" color="secondary">
                  계획서 양식 다운로드
                </Button>
            </Grid>
            <Grid xs={6} sm={2}>
                <input
                  type="file"
                  onChange={event => fileUploadHandle(event)}
                />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 35 }}>
            <Grid xs={6} sm={4}>
                <br />
                <h2>수업 타입</h2>
            </Grid>
            <Grid xs={6} sm={2}>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={inputClassInfo.type}
                    row
                    aria-label="position"
                    name="type"
                    onChange={event => inputChangeHandle(event)}>
                    <FormControlLabel
                      value="MAJOR"
                      control={<Radio color="primary" />}
                      label="전공"
                    />
                    <FormControlLabel
                      value="CULTURE"
                      control={<Radio color="primary" />}
                      label="교양"
                    />
                  </RadioGroup>
                </FormControl>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 35 }}>
            <Grid xs={6} sm={4}>
                <br />
                <br />
                <br />
                <h2>수업 내용</h2>
            </Grid>
            <Grid xs={6} sm={8}>
              <Paper className={classes.paper} style={{ minHeight: 105 }}>
                <div id="editorSection"></div>
              </Paper>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 35 }}>
            <Grid xs={6} sm={4}>
              <br />
              <h2>메뉴 종류</h2>
            </Grid>
            <Grid xs={6} sm={8} style={{ minHeight: 105 }}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="REPORT"
                      checked={state.REPORT}
                      onChange={handleChange}
                      name="REPORT"
                      disabled
                    />
                  }
                  label="과 제"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="NOTICE"
                      checked={state.NOTICE}
                      onChange={handleChange}
                      name="NOTICE"
                    />
                  }
                  label="공지사항"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="REFERENCE"
                      checked={state.REFERENCE}
                      onChange={handleChange}
                      name="REFERENCE"
                    />
                  }
                  label="참고자료"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="QnA"
                      checked={state.QnA}
                      onChange={handleChange}
                      name="QnA"
                    />
                  }
                  label="Q/A"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 5 }}>
            <Grid xs={6} sm={4}>
              <h2>수업 개시 여부</h2>
            </Grid>
            <Grid xs={6} sm={8}>
              <RadioGroup
                value={inputClassInfo.use_state}
                row
                aria-label="position"
                name="use_state"
                onChange={event => inputChangeHandle(event)}>
                <FormControlLabel
                  value={'YSE'}
                  control={<Radio color="primary" />}
                  label="개시"
                />
                <FormControlLabel
                  value={'NO'}
                  control={<Radio color="primary" />}
                  label="미개시"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 35 }}>
            <Grid xs={12} sm={12}>
              <Paper className={classes.paper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.submitCheck}
                      onChange={handleChange}
                      name="submitCheck"
                    />
                  }
                  label="입력한 대로 수업을 등록합니다."
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 5 }}>
            <Grid xs={12} sm={12}>
              <Paper className={classes.paper}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  style={{ minHeight: 50 }}>
                  임시 저장
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 5 }}>
            <Grid xs={12} sm={12}>
              <Paper className={classes.paper}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ minHeight: 70 }}
                  onClick={event => addClassSubmit(event)}>
                  수업 등록
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddClass;

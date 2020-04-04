import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { FormLabel, Card, CardHeader, CardContent } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';

import Editor from 'tui-editor'; /* ES6 */
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import * as CLASS_ACTION from '@store/actions/ClassActions';
import * as RedirectActions from '@store/actions/RedirectActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';
import * as SideBarActions from '@store/actions/SideBarActions';
import { compareToDate } from '@common/functions/CompareToDate';

import TransferList from '@common/component/CustomTransferList';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import Chip from '@material-ui/core/Chip';

import * as axiosPost from '@axios/post';

const ValidationTextField = withStyles({
  root: {
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important' // override inline-style
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  requireFont: {
    color: 'red'
  },
  paper: {
    padding: theme.spacing(1)
  },
  innerPaper: {
    padding: theme.spacing(4)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function createButton(iconClassName) {
  const button = document.createElement('button');

  button.className = 'custom-button';
  button.innerHTML = `<i class="${iconClassName}"></i>`;

  return button;
}

function parseDate(number){
  if(parseInt(number / 10) === 0){
    return "0"+number;
  }
  return number;
}

const AddClass = () => {
  const dispatch = useDispatch();

  const name = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const [instance, setInstance] = useState();

  const classes = useStyles();
  const [submitCheck, setSubmitCheck] = React.useState(false);

  const nowDate = new Date();
  const nowDateFormat = nowDate.getFullYear() + "-" + parseDate(nowDate.getMonth() + 1) + "-" + parseDate(nowDate.getDate());
  const endDateFormat = nowDate.getFullYear() + "-" + parseDate(nowDate.getMonth() + 4) + "-" + parseDate(nowDate.getDate());

  const [checkedMenuResult, setCheckedMenuResult] = useState([]);
  const [classFileUpload, setClassFileUpload] = useState();
  const [inputClassInfo, setInputClassInfo] = useState({
    name: '',
    startDate: nowDateFormat,
    endDate: endDateFormat,
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

  const handleChange = value => {
    setCheckedMenuResult(value);
  };

  const addClassSubmit = event => {
    event.preventDefault();
    if (name.current.value.trim() === '') {
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
    } else if (!submitCheck) {
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
      axiosPost.postContainsData(
        '/api/professor/class',
        getResponse,
        addClassInfo
      );
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
    dispatch(ProgressBarActions.isProgressBar(false));
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
      <Grid container spacing={4}>
        <Grid item lg={2} md={2} xl={2} xs={12} />
        <Grid item lg={8} md={8} xl={8} xs={12}>
          <Card>
            <CardHeader
              subheader="수업에 대한 기본정보를 등록합니다."
              title="수업 등록"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <ValidationTextField
                    inputRef={name}
                    variant="outlined"
                    name="name"
                    fullWidth
                    label="수업명*"
                    defaultValue=" "
                    helperText="수업명은 필수 항목입니다."
                    placeholder="수업명을 입력하세요."
                    onChange={event => inputChangeHandle(event)}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <ValidationTextField
                    inputRef={startDate}
                    fullWidth
                    type="date"
                    label="수업 시작일*"
                    helperText="수업 시작일자는 필수 항목입니다."
                    name="startDate"
                    defaultValue={inputClassInfo['startDate']}
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
                <Grid item xs={6} sm={6}>
                  
                  <ValidationTextField
                    inputRef={endDate}
                    fullWidth
                    type="date"
                    label="수업 종료일*"
                    helperText="수업 종료일자는 필수 항목입니다."
                    defaultValue={inputClassInfo['endDate']}
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
                  <Grid item xs={2} sm={2} />
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 15 }}>
                <Grid item xs={12} sm={12}>
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      fullWidth
                      component="span">
                      <CloudUploadIcon />
                      &nbsp;강의계획서 등록
                    </Button>
                  </label>
                  <input
                    id="contained-button-file"
                    type="file"
                    onChange={event => fileUploadHandle(event)}
                    style={{
                      display: 'none'
                    }}
                  />
                </Grid>
                <Grid item xs={2} sm={2} />
                <Grid item xs={2} sm={2} />
                <Grid item xs={8} sm={8}>
                  <br />
                  {classFileUpload ? (
                    <Chip
                      label={classFileUpload['name']}
                      onDelete={() => setClassFileUpload(null)}
                      className={classes.chip}
                    />
                  ) : null}
                </Grid>
              </Grid>
              <Grid container style={{marginTop:50}}>
                <Grid xs={6} sm={6} style={{textAlign:'center'}}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink>
                      수업 타입
                    </InputLabel>
                    <Select
                      value={inputClassInfo.type}
                      onChange={event => inputChangeHandle(event)}
                      name={'type'}
                      className={classes.selectEmpty}
                    >
                      <MenuItem value={'MAJOR'}>전 공</MenuItem>
                      <MenuItem value={'CULTURE'}>교 양</MenuItem>
                    </Select>
                    <FormHelperText>수업 타입을 선택해주세요.</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid xs={6} sm={6} style={{textAlign:'center'}}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink>
                      수업 타입
                    </InputLabel>
                    <Select
                      value={inputClassInfo.use_state}
                      onChange={event => inputChangeHandle(event)}
                      name={'use_state'}
                      className={classes.selectEmpty}
                    >
                      <MenuItem value={'YSE'}>개 시</MenuItem>
                      <MenuItem value={'NO'}>미개시</MenuItem>
                    </Select>
                    <FormHelperText>수업 타입을 선택해주세요.</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 35 }}>
                <Grid item xs={12} sm={12}>
                  <Paper className={classes.paper} style={{ minHeight: 105 }}>
                    <h4> - 수업 내용</h4>
                    <br />
                    <div id="editorSection"></div>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 35 }}>
                <Grid item xs={12} sm={12}>
                  <TransferList leftData={['공지사항','참고자료','Q/A']} handleChange={handleChange}/>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 35 }}>
                <Grid item xs={2} sm={2} />
                <Grid item xs={8} sm={8}>
                  <Paper className={classes.paper}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={submitCheck}
                          onChange={()=>setSubmitCheck(!submitCheck)}
                          name="submitCheck"
                        />
                      }
                      label="입력한 대로 수업을 등록합니다."
                    />
                  </Paper>
                  <br />
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 5 }}>
                <Grid item xs={2} sm={2} />
                <Grid item xs={8} sm={8}>
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
                <Grid item xs={2} sm={2} />
                <Grid item xs={8} sm={8}>
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
                  <br />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddClass;

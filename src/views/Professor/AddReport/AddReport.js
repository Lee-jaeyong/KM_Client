import React,{useEffect,useState,useRef} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import {useDispatch,useSelector} from 'react-redux';

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
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import Editor from 'tui-editor'; /* ES6 */
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
import {compareToDate} from '@common/functions/CompareToDate';
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import * as REPORT_ACTION from '@store/actions/ReportActions';
import * as RedirectActions from '@store/actions/RedirectActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';

import * as axiosPost from '@axios/post';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  requireFont : {
    color:'red'
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function createButton(iconClassName) {
  const button = document.createElement('button');

  button.className = 'custom-button';
  button.innerHTML = `<i class="${iconClassName}"></i>`;

  return button;
}

const AddReport = () => {
  const name = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const imgInput = useRef();
  const fileInput = useRef();

  const dispatch = useDispatch();
  const classes = useStyles();
  const [submitCheck, setSubmitCheck] = useState(false);
  const [instance,setInstance] = useState();
  const selectClass = useSelector(state=>state['SelectUtil']['selectClass']);
  
  const [nowSaveImg, setNowSaveImg] = useState('');
  const [nowSaveFile, setNowSaveFile] = useState('');

  const [reportImg,setReportImg] = useState([]);
  const [reportFile,setReportFile] = useState([]);
  const [reportInfo,setReportInfo] = useState({
    name:'',
    startDate:'',
    endDate:'',
    content:'',
    submitOverDue_state : 'YSE',
    showOtherReportOfStu_state : 'YSE'
  });

  const inputChangeHandle = event => {
    const _inputReportInfo = {
      ...reportInfo,
      [event.target.name]: event.target.value
    };
    setReportInfo(_inputReportInfo);
  };

  const showMessageBox = (title,level,visible) => {
    let message = {
      content: title,
      level: level,
      visible: visible
    };
    dispatch(SHOW_MESSAGE_ACTION.show_message(message));
  }

  const imgFileChangeHandle = event => {
    let _fileLen = event.target.value.length;
    let _lastDot = event.target.value.lastIndexOf('.');
    let _fileExt = event.target.value.substring(_lastDot, _fileLen).toLowerCase();
    if(_fileExt !== '.jpg' && _fileExt !== '.png' && _fileExt !== '.jpeg'){
      event.target.value = '';
      setNowSaveImg('');
      dispatch(SHOW_MESSAGE_ACTION.show_message({content:"이미지 형식(jpg,jpeg,png)만 업로드 가능합니다.",visible:true}));
      return;
    }
    let _reportImg = reportImg;
    _reportImg.push(event.target.files[0]);
    setReportImg(_reportImg);
    setNowSaveImg(event.target.value);
  } 

  const fileChangeHandle = event => {
    let _reportFile = reportFile;
    _reportFile.push(event.target.files[0]);
    setReportFile(_reportFile);
    setNowSaveFile(event.target.value);
  }

  const deleteImg = name => {
    let _reportImg = reportImg.filter((img)=>img['name'] !== name);
    imgInput.current.value="";
    setNowSaveImg('');
    setReportImg(_reportImg);
  }

  const deleteFile = name => {
    let _reportFile = reportFile.filter((file)=>file['name'] !== name);
    fileInput.current.value="";
    setNowSaveFile('');
    setReportFile(_reportFile);
  }

  const addReportSubmit = event => {
    event.preventDefault();
    if(name.current.value === ''){
      showMessageBox('과제명을 입력해주세요.','',true);
      name.current.focus();
      return;
    }else if(startDate.current.value === ''){
      showMessageBox('과제 시작일을 선택해주세요.','',true);
      startDate.current.focus();
      return;
    }else if(endDate.current.value === ''){
      showMessageBox('과제 마감일을 선택해주세요.','',true);
      endDate.current.focus();
      return;
    }else if(!submitCheck){
      showMessageBox('동의란을 체크해주세요.','',true);
      return;
    }
    let addReportInfo = {
      classIdx : selectClass['classIdx'],
      ...reportInfo,
      content : instance.getHtml()
    }
    dispatch(ProgressBarActions.isProgressBar(true));
    axiosPost.postContainsData("/report/"+selectClass['classIdx'],getResponse,addReportInfo);
  }

  const getResponse = (res) => {
    dispatch(REPORT_ACTION.save_report(res));
    if(reportImg.length !== 0){
      let formData = new FormData();
      for(let i = 0;i<reportImg.length;i++)
        formData.append("file",reportImg[i]);
      axiosPost.postFileUpload("/uploadFile/"+res.seq+"/reportRelatedFiles/img",getImgFileResponse,formData);
    }
    if(reportFile.length !== 0){
      let formData = new FormData();
      for(let i =0;i<reportFile.length;i++)
        formData.append("file",reportFile[i]);
      axiosPost.postFileUpload("/uploadFile/"+res.seq+"/reportRelatedFiles/file",getFileResponse,formData);
    }
    showMessageBox('과제 등록 완료','',true);
    dispatch(RedirectActions.isRedirect(true,"/class/report/"+res.seq));
    window.scrollTo(0,0);
  }

  const getImgFileResponse = (res) => {
    dispatch(REPORT_ACTION.fileUpload_report_IMG(res));
  }

  const getFileResponse = (res) => {
    dispatch(REPORT_ACTION.fileUpload_report_FILE(res));
  }

  useEffect(()=>{
  },[nowSaveFile,nowSaveImg]);

  useEffect(()=>{
    setInstance(new Editor({
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
    }));
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
                  <TableCell colSpan="4" align="center"><h1>* 과 제 등 록</h1><span className={classes.requireFont}>*5분마다 자동으로 임시저장 됩니다.</span></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center"><h2>수업명</h2></TableCell>
                  <TableCell colSpan="3" align="left"><TextField fullWidth variant="outlined" disabled value={selectClass['className']}/></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>과제명</h2><span className={classes.requireFont}>*필수 입력 값입니다</span></TableCell>
                  <TableCell colSpan="3" align="left">
                    <TextField
                      inputRef={name}
                      fullWidth
                      name="name"
                      value={reportInfo['name']}
                      variant="outlined"
                      onChange={event=>inputChangeHandle(event)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>과제 시작일</h2><span className={classes.requireFont}>*필수 입력 값입니다</span></TableCell>
                  <TableCell align="left">
                    <TextField
                      inputRef={startDate}
                      fullWidth
                      name="startDate"
                      value={reportInfo['startDate']}
                      type="date"
                      variant="outlined"
                      onChange={event=>{
                        if(reportInfo['endDate'] === '')
                        {
                          inputChangeHandle(event)
                          return;
                        }
                        if(reportInfo['endDate'] !== '' && compareToDate(event.target.value,reportInfo['endDate']))
                          inputChangeHandle(event)
                        else
                        {
                          showMessageBox('과제 시작일은 종료일보다 작아야합니다.','error',true);
                          setReportInfo({...reportInfo, startDate:''});
                          startDate.current.value='';
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="center"><h2>과제 마감일</h2><span className={classes.requireFont}>*필수 입력 값입니다</span></TableCell>
                  <TableCell align="left">
                    <TextField
                      inputRef={endDate}
                      fullWidth
                      name="endDate"
                      value={reportInfo['endDate']}
                      type="date"
                      variant="outlined"
                      onChange={event=>{
                        {
                          if(reportInfo['startDate'] === '')
                          {
                            inputChangeHandle(event)
                            return;
                          }
                          if(reportInfo['startDate'] !== '' && compareToDate(reportInfo['startDate'],event.target.value))
                            inputChangeHandle(event)
                          else
                          {
                            showMessageBox('과제 마감일은 시작일보다 커야합니다.','error',true);
                            setReportInfo({...reportInfo, endDate:''});
                            endDate.current.value='';
                          }
                        } 
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>참고 이미지 등록</h2><br/>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    <input type="file" ref={imgInput} onChange={event=>imgFileChangeHandle(event)}/>
                    {
                      reportImg.map((img,idx)=>{
                        return (
                          <div>
                            <Fab
                              variant="extended"
                              size="medium"
                              color="primary"
                              aria-label="add"
                              className={classes.margin}
                              onClick={()=>deleteImg(img['name'])}
                            >
                              <NavigationIcon className={classes.extendedIcon} />
                              {img['name']}
                            </Fab>
                          </div>
                        )
                      })
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>참고 파일 등록</h2><br/>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    <input type="file" ref={fileInput} onChange={event=>fileChangeHandle(event)}/>
                    {
                      reportFile.map((file,idx)=>{
                        return (
                          <div>
                            <Fab
                              variant="extended"
                              size="medium"
                              color="primary"
                              aria-label="add"
                              className={classes.margin}
                              onClick={()=>deleteFile(file['name'])}
                            >
                              <NavigationIcon className={classes.extendedIcon} />
                              {file['name']}
                            </Fab>
                          </div>
                        )
                      })
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>마감 이후 제출 가능 여부</h2></TableCell>
                  <TableCell colSpan="3" align="left">
                    <RadioGroup row aria-label="position" name="submitOverDue_state" value={reportInfo['submitOverDue_state']}
                    onChange={event => inputChangeHandle(event)}>
                      <FormControlLabel
                        value="YSE"
                        control={<Radio color="primary"/>}
                        label="가능"
                      />
                      <FormControlLabel
                        value="NO"
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
                    <RadioGroup row aria-label="position" name="showOtherReportOfStu_state" value={reportInfo['showOtherReportOfStu_state']}
                    onChange={event => inputChangeHandle(event)}>
                      <FormControlLabel
                        value="YSE"
                        control={<Radio color="primary"/>}
                        label="공개"
                      />
                      <FormControlLabel
                        value="NO"
                        control={<Radio color="primary" />}
                        label="미공개"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="4" align="center">
                    <FormControlLabel
                      control={<Checkbox checked={submitCheck} onChange={()=>setSubmitCheck(!submitCheck)} name="submitCheck" />}
                      label="입력한 대로 과제를 등록합니다."
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="4" align="right">
                    <Button variant="contained" color="secondary" fullWidth style={{minHeight:50}}>
                      임시 저장
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="4" align="right">
                    <Button variant="contained" color="primary" fullWidth style={{minHeight:70}} onClick={(event)=>addReportSubmit(event)}>
                      과제 등록
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

export default AddReport;

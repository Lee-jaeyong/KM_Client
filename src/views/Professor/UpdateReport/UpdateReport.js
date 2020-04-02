import React,{useEffect,useState,useRef} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import {Redirect} from 'react-router-dom';

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
import CustomConfirmDialog from '@common/component/CustomConfirmDialog';
import {compareToDate} from '@common/functions/CompareToDate';
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';
import * as REPORT_ACTION from '@store/actions/ReportActions';
import * as RedirectActions from '@store/actions/RedirectActions';

import * as filter from '@common/functions/ConvertNotXssFilter';

import * as axiosDelete from '@axios/delete';
import * as axiosGet from '@axios/get';
import * as axiosPost from '@axios/post';
import * as axiosPut from '@axios/put';

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
  const name = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const imgInput = useRef();
  const fileInput = useRef();

  const dispatch = useDispatch();
  const [dialogState,setDialogState] = useState(false);
  const [dialogState_type,setDialogState_type] = useState();
  const [nowDeleteFile,setNowDeleteFile] = useState();

  const selectReport = useSelector(state=>state['Report']['reportInfo']);
  const classes = useStyles(); 

  const [submitCheck,setSubmitCheck] = useState(false);
  const [instance,setInstance] = useState();
  const [reportInfo,setReportInfo] = useState({
      classIdx: '',
      seq: '',
      name: '',
      startDate: '',
      endDate: '',
      content: '',
      hit: 0,
      submitOverDue_state: "YSE",
      showOtherReportOfStu_state: "YSE",
      fileList: "",
      imgList: "",
    }
  );
  const [fileList,setFileList] = useState();
  const [imgList,setImgList] = useState();
  
  const [nowSaveImg, setNowSaveImg] = useState('');
  const [nowSaveFile, setNowSaveFile] = useState('');

  const inputHandleChange = (event) => {
    setReportInfo({
      ...reportInfo,
      [event.target.name] : event.target.value
    });
  }

  const fileDeleteHandle = () => {
    let fileName = nowDeleteFile.substring(0,nowDeleteFile.indexOf('.'));
    let fileForm = nowDeleteFile.substring(fileName.length+1,nowDeleteFile.length);
    axiosDelete.deleteNotContainsData("/api/professor/uploadFile/"+reportInfo['seq']+"/reportRelatedFiles/"+fileName+"/"+fileForm,fileDeleteResult);
  }

  const fileDeleteResult = (res) => {
    axiosGet.getNotContainsData("/api/professor/report/"+reportInfo['seq']+"/fileList",fileGetResult);
  }

  const fileGetResult = (res) => {
    let _imgList = [];
    let _fileList = [];
    const fileList = res['reportFileAndImgList'];
    for(let i =0;i<fileList.length;i++){
      if(fileList[i]['type'] === 'FILE')
        _fileList.push(fileList[i]['fileName']);
      else
        _imgList.push(fileList[i]['fileName']);
    }
    setImgList(_imgList);
    setFileList(_fileList);
  }

  const openDialog = (fileOrImg,type) => {
    setDialogState(true);
    setNowDeleteFile(fileOrImg);
    setDialogState_type(type);
  }

  const imgFileUpload = event => {
    let _fileLen = event.target.value.length;
    let _lastDot = event.target.value.lastIndexOf('.');
    let _fileExt = event.target.value.substring(_lastDot, _fileLen).toLowerCase();
    if(_fileExt !== '.jpg' && _fileExt !== '.jpeg' && _fileExt !== '.png'){
      dispatch(SHOW_MESSAGE_ACTION.show_message({content:"이미지 형식만 업로드 가능합니다.",visible:true}));
      return;
    }
    let formData = new FormData();
    formData.append("file",event.target.files[0]);
    axiosPost.postFileUpload("/api/professor/uploadFile/"+reportInfo['seq']+"/reportRelatedFiles/"+event.target.name,getFileListAfterUpload,formData);
    event.target.value = "";
  }

  const fileUpload = event => {
    let formData = new FormData();
    formData.append("file",event.target.files[0]);
    axiosPost.postFileUpload("/api/professor/uploadFile/"+reportInfo['seq']+"/reportRelatedFiles/"+event.target.name,getFileListAfterUpload,formData);
    event.target.value = "";
  }

  const getFileListAfterUpload = (res) => {
    axiosGet.getNotContainsData("/api/professor/report/"+reportInfo['seq']+"/fileList",fileGetResult);
  }

  const deleteImg = name => {
    let _reportImg = imgList.filter((img)=> img !== name);
    imgInput.current.value="";
    setNowSaveImg('');
    setImgList(_reportImg);
  }

  const deleteFile = name => {
    let _reportFile = fileList.filter((file)=>file !== name);
    fileInput.current.value="";
    setNowSaveFile('');
    setImgList(_reportFile);
  }

  const updateReportSubmit = event => {
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
    dispatch(ProgressBarActions.isProgressBar(true));
    setTimeout(() => {
      let updateReportInfo = {
        name:reportInfo['name'],
        startDate:reportInfo['startDate'],
        endDate:reportInfo['endDate'],
        submitOverDue_state:reportInfo['submitOverDue_state'],
        showOtherReportOfStu_state:reportInfo['showOtherReportOfStu_state'],
        content : instance.getHtml()
      }
      axiosPut.putContainsData("/api/professor/report/"+reportInfo['seq'],getResponse,updateReportInfo);
    },1000);
  }

  const getResponse = (res) => {
    dispatch(REPORT_ACTION.save_report(res));
    showMessageBox('과제 수정 완료','',true);
    dispatch(RedirectActions.isRedirect(true,"/class/report/"+reportInfo['seq']));
    window.scrollTo(0,0);
  }

  const showMessageBox = (title,level,visible) => {
    let message = {
      content: title,
      level: level,
      visible: visible
    };
    dispatch(SHOW_MESSAGE_ACTION.show_message(message));
  }

  useEffect(()=>{
    try{
      setReportInfo(selectReport);
      setImgList(selectReport['imgList'].split(','));
      setFileList(selectReport['fileList'].split(','));
      setInstance(new Editor({
        el: document.querySelector('#editorSection'),
        initialEditType: 'wysiwyg',
        initialValue: filter.ConvertNotXssFilter(selectReport['content']),
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
    }catch{
    }
  },[]);

  return (
    <div className={classes.root}>
        {JSON.stringify(selectReport) === "{}" ? <Redirect to={"/dashboard"}/> : null} 
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
                  <TableCell colSpan="3" align="left"><TextField inputRef={name} fullWidth variant="outlined" name="name" value={reportInfo['name']} onChange={(event)=>inputHandleChange(event)}/></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>과제 시작일</h2><span className={classes.requireFont}>*필수 입력 값입니다</span></TableCell>
                  <TableCell align="left">
                    <TextField
                      inputRef={startDate}
                      fullWidth
                      type="date"
                      variant="outlined"
                      name="startDate"
                      value={reportInfo['startDate']}
                      onChange={event=>{
                        if(reportInfo['endDate'] === '')
                        {
                          inputHandleChange(event)
                          return;
                        }
                        if(reportInfo['endDate'] !== '' && compareToDate(event.target.value,reportInfo['endDate']))
                          inputHandleChange(event)
                        else
                        {
                          showMessageBox('과제 시작일은 종료일보다 작아야합니다.','error',true);
                          setReportInfo({...reportInfo, startDate:''});
                          startDate.current.value='';
                        }
                      }}
                    /></TableCell>
                  <TableCell align="center"><h2>과제 마감일</h2><span className={classes.requireFont}>*필수 입력 값입니다</span></TableCell>
                  <TableCell align="left">
                    <TextField
                      inputRef={endDate}
                      fullWidth 
                      type="date" 
                      variant="outlined" 
                      name="endDate" 
                      value={reportInfo['endDate']} 
                      onChange={event=>{
                        {
                          if(reportInfo['startDate'] === '')
                          {
                            inputHandleChange(event)
                            return;
                          }
                          if(reportInfo['startDate'] !== '' && compareToDate(reportInfo['startDate'],event.target.value))
                            inputHandleChange(event)
                          else
                          {
                            showMessageBox('과제 마감일은 시작일보다 커야합니다.','error',true);
                            setReportInfo({...reportInfo, endDate:''});
                            endDate.current.value='';
                          }
                        } 
                      }}
                      /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>참고 이미지 등록</h2><br/>
                  </TableCell>
                  <TableCell colSpan="3" align="left"><input ref={imgInput} type="file" name="img" onChange={(event)=>imgFileUpload(event)}/>
                      {imgList ? imgList.map((img,idx)=>{
                        return (
                          img !== '' ?
                          <div>
                            <br/>
                            <Fab
                              variant="extended"
                              size="medium"
                              color="primary"
                              aria-label="add"
                              className={classes.margin}
                              onClick={()=>openDialog(img,'IMG')}
                            >
                              <NavigationIcon className={classes.extendedIcon} />
                              {img}
                            </Fab>
                          </div>
                          : null
                        )
                      }):null}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>참고 파일 등록</h2><br/>
                  </TableCell>
                  <TableCell colSpan="3" align="left"><input ref={fileInput} type="file" name="file" onChange={(event)=>fileUpload(event)}/><br/>
                  {fileList ? fileList.map((file,idx)=>{
                        return (
                          file !== '' ? 
                          <div>
                            <br/>
                            <Fab
                              variant="extended"
                              size="medium"
                              color="primary"
                              aria-label="add"
                              className={classes.margin}
                              onClick={()=>openDialog(file,'FILE')}
                            >
                              <NavigationIcon className={classes.extendedIcon} />
                              {file}
                            </Fab>
                          </div>
                          : null
                        )
                      }):null}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>마감 이후 제출 가능 여부</h2></TableCell>
                  <TableCell colSpan="3" align="left">
                    <RadioGroup row aria-label="position" name="submitOverDue_state" value={reportInfo['submitOverDue_state']} onChange={(event)=>inputHandleChange(event)}>
                      <FormControlLabel
                        value='YSE'
                        control={<Radio color="primary"/>}
                        label="가능"
                      />
                      <FormControlLabel
                        value='NO'
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
                    <RadioGroup row aria-label="position" name="showOtherReportOfStu_state" value={reportInfo['showOtherReportOfStu_state']} onChange={(event)=>inputHandleChange(event)}>
                      <FormControlLabel
                        value='YSE'
                        control={<Radio color="primary"/>}
                        label="공개"
                      />
                      <FormControlLabel
                        value='NO'
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
                      label="입력한 대로 과제를 수정합니다."
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="4" align="right">
                    <Button variant="contained" color="primary" fullWidth style={{minHeight:70}} onClick={(event)=>updateReportSubmit(event)}>
                      과제 수정
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <CustomConfirmDialog
            title={"첨부 파일 및 이미지 삭제"}
            content={"정말 삭제하시겠습니까?"}
            open={dialogState}
            closeHandle={()=>setDialogState(false)}
            handleYseClick={fileDeleteHandle}
          />
        </Grid>
    </div>
  );
};

export default UpdateReport;

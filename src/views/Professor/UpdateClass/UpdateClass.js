import React,{useEffect,useState,useRef} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import {useSelector,useDispatch} from 'react-redux';

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
import {compareToDate} from '@common/functions/CompareToDate';
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';
import * as ProgressBarActions from '@store/actions/ProgressBarActions';
import {Redirect} from 'react-router-dom';

import * as axiosDelete from '@axios/delete';
import * as axiosPut from '@axios/put';
import * as axiosPost from '@axios/post';

import * as filter from '@common/functions/ConvertNotXssFilter';
import * as CLASS_ACTION from '@store/actions/ClassActions';
import * as RedirectActions from '@store/actions/RedirectActions';
import * as SideBarActions from '@store/actions/SideBarActions';

import CustomConfirmDialog from '@common/component/CustomConfirmDialog';

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

const UpdateClass = () => {
  const dispatch = useDispatch();
  
  const name = useRef();
  const startDate = useRef();
  const endDate = useRef();

  const classes = useStyles();

  const [dialogState,setDialogState] = useState(false);
  const [instance,setInstance] = useState();
  
  const [inputClassInfo,setInputClassInfo] = useState(useSelector(state=>state['Class']['classInfo']));
  const [checkedMenuResult, setCheckedMenuResult] = useState(inputClassInfo['selectMenu'] ? inputClassInfo['selectMenu'].split(",") : null);
  const selectedMenu = inputClassInfo['selectMenu'] ? inputClassInfo['selectMenu'].split(",") : null;

  let checkMenu = {};
  try{
    for(let i =0;i<selectedMenu.length;i++)
    {
      if(selectedMenu[i] !== '')
      {
        checkMenu = {
          ...checkMenu,
          [selectedMenu[i]]:true
        }
      }
    }
  }catch{
  }

  const [state, setState] = React.useState({
    ...checkMenu,
    submitCheck:false
  });

  const [classFileUpload, setClassFileUpload] = useState();
  const [update_classFileUpload,setUpdate_classFileUpload] = useState();
  const inputChangeHandle = event => {
    const updateClassInfo = {
      ...inputClassInfo,
      [event.target.name]: event.target.value
    };
    setInputClassInfo(updateClassInfo);
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

  const fileDeleteHandle = () => {
    axiosDelete.deleteNotContainsData("/uploadFile/"+inputClassInfo['seq']+"/classInfoExcel",fileDeleteResult);
  }

  const fileDeleteResult = (res) => {
    setClassFileUpload(null);
  }

  const getResponse = (res) => {
    dispatch(CLASS_ACTION.save_class(res));
    if(update_classFileUpload !== null && update_classFileUpload !== undefined){
      let formData = new FormData();
      formData.append("file",update_classFileUpload);
      axiosPost.postFileUpload("/uploadFile/"+res.seq+"/classInfoExcel",getFileResponse,formData);
    }
    showMessageBox('수업 수정 완료','',true);
    dispatch(RedirectActions.isRedirect(true,"/class/"+res.seq));
    dispatch(SideBarActions.isUpdate(true));
    window.scrollTo(0,0);
  }

  const getFileResponse = (res) => {
    dispatch(CLASS_ACTION.fileUpload_class(res));
  }

  const fileUploadHandle = event => {
    let _fileLen = event.target.value.length;
    let _lastDot = event.target.value.lastIndexOf('.');
    let _fileExt = event.target.value.substring(_lastDot, _fileLen).toLowerCase();
    if(_fileExt !== '.xlsx'){
      event.target.value = "";
      setUpdate_classFileUpload(null);
      dispatch(SHOW_MESSAGE_ACTION.show_message({content:"엑셀 형식만 업로드 가능합니다.",visible:true}));
      return;
    }
    setUpdate_classFileUpload(event.target.files[0]);
  }

  const showMessageBox = (title,level,visible) => {
    let message = {
      content: title,
      level: level,
      visible: visible
    };
    dispatch(SHOW_MESSAGE_ACTION.show_message(message));
  }

  const updateClassSubmit = event => {
    event.preventDefault();
    if(name.current.value === ''){
      showMessageBox('수업명을 입력해주세요.','',true);
      name.current.focus();
      return;
    }else if(startDate.current.value === ''){
      showMessageBox('수업 시작일을 선택해주세요.','',true);
      startDate.current.focus();
      return;
    }else if(endDate.current.value === ''){
      showMessageBox('수업 종료일을 선택해주세요.','',true);
      endDate.current.focus();
      return;
    }else if(!state['submitCheck']){
      showMessageBox('동의란을 체크해주세요.','',true);
      return;
    }
    dispatch(ProgressBarActions.isProgressBar(true));
    setTimeout(() => {
      let updateClassInfo = {
        ...inputClassInfo
      };
      let classMenuSelect = 'REPORT,';
      for (let i=0;i<checkedMenuResult.length;i++) {
        classMenuSelect += checkedMenuResult[i] + ',';
      }
      updateClassInfo = {
        seq : inputClassInfo['seq'],
        name: inputClassInfo['name'],
        startDate: inputClassInfo['startDate'],
        endDate: inputClassInfo['endDate'],
        type: inputClassInfo['type'],
        replyPermit_state: inputClassInfo['replyPermit_state'],
        use_state: inputClassInfo['use_state'],
        selectMenu: classMenuSelect,
        content:instance.getHtml()
      };
      axiosPut.putContainsData("/professor/class",getResponse,updateClassInfo);
    }, 1000);
  };

  useEffect(()=>{
  },[classFileUpload]);

  useEffect(()=>{
    try{
        setInstance(
          new Editor({
            el: document.querySelector('#editorSection'),
            initialEditType: 'wysiwyg',
            initialValue: filter.ConvertNotXssFilter(inputClassInfo['content']),
            height: '1000px',
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
    }catch{}
    setClassFileUpload(inputClassInfo['plannerDocName'] ? inputClassInfo['plannerDocName'] : null);
  },[]);

  return (
    <div className={classes.root}>
        {JSON.stringify(inputClassInfo) === "{}" ? <Redirect to={"/dashboard"}/> : null} 
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
                  <TableCell colSpan="4" align="center"><h1>* 수 업 수 정</h1></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center"><h2>수업명</h2></TableCell>
                  <TableCell colSpan="3" align="left">
                    <TextField
                      fullWidth
                      inputRef={name}
                      value={inputClassInfo['name']}
                      variant="outlined"
                      name="name"
                      onChange={(event)=>setInputClassInfo({
                        ...inputClassInfo,
                        [event.target.name]:event.target.value
                      })} 
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>수업 시작일</h2></TableCell>
                  <TableCell align="left">
                    <TextField
                      fullWidth
                      inputRef={startDate}
                      type="date"
                      value={inputClassInfo['startDate']}
                      variant="outlined"
                      name="startDate"
                      onChange={(event)=>{
                        {
                          if(inputClassInfo['endDate'] === '')
                          {
                            inputChangeHandle(event)
                            return;
                          }
                          if(inputClassInfo['endDate'] !== '' && compareToDate(event.target.value,inputClassInfo['endDate']))
                            inputChangeHandle(event)
                          else
                          {
                            showMessageBox('수업 시작일은 종료일보다 작아야합니다.','error',true);
                            setInputClassInfo({
                              ...inputClassInfo,
                              startDate:''
                            })
                            startDate.current.value='';
                          }
                        }
                      }} 
                    />
                  </TableCell>
                  <TableCell align="center"><h2>수업 종료일</h2></TableCell>
                  <TableCell align="left">
                    <TextField
                      fullWidth
                      inputRef={endDate}
                      type="date"
                      value={inputClassInfo['endDate']}
                      variant="outlined"
                      name="endDate"
                      onChange={(event)=>{
                        {
                          if(inputClassInfo['startDate'] === '')
                          {
                            inputChangeHandle(event)
                            return;
                          }
                          if(inputClassInfo['startDate'] !== '' && compareToDate(inputClassInfo['startDate'],event.target.value))
                            inputChangeHandle(event)
                          else
                          {
                            showMessageBox('수업 종료일은 시작일보다 커야합니다.','error',true);
                            setInputClassInfo({
                              ...inputClassInfo,
                              endDate:''
                            })
                            endDate.current.value='';
                          }
                        } 
                      }}   
                    /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>강의계획서 등록</h2><br/>
                  </TableCell>
                  <TableCell colSpan="3" align="left">
                    {classFileUpload ? <div><a href="#">{classFileUpload}</a>&nbsp;&nbsp;
                    <Button variant="contained" color="primary" style={{minHeight:20}} onClick={()=>setDialogState(true)}>
                      삭 제
                    </Button>
                    </div>
                    : 
                    <input type="file" onChange={(event)=>fileUploadHandle(event)}/>
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>수업 타입</h2></TableCell>
                  <TableCell colSpan="3" align="left">
                    <RadioGroup row aria-label="position" name="type" value={inputClassInfo['type']} onChange={event => inputChangeHandle(event)}>
                      <FormControlLabel
                        value="MAJOR"
                        control={<Radio color="primary"/>}
                        label="전공"
                      />
                      <FormControlLabel
                        value="CULTURE"
                        control={<Radio color="primary" />}
                        label="교양"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>수업 내용</h2></TableCell>
                  <TableCell colSpan="3" align="center">
                    <div id="editorSection"></div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>댓글 사용 여부</h2></TableCell>
                  <TableCell colSpan="3" align="left">
                    <RadioGroup
                      row
                      value={inputClassInfo['replyPermit_state']}
                      aria-label="position"
                      name="replyPermit_state"
                      onChange={event => inputChangeHandle(event)}
                    >
                      <FormControlLabel
                        value={'YSE'}
                        control={<Radio color="primary"/>}
                        label="허용"
                      />
                      <FormControlLabel
                        value={'NO'}
                        control={<Radio color="primary" />}
                        label="미허용"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>메뉴 종류</h2></TableCell>
                  <TableCell colSpan="3" align="left">
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"><h2>수업 개시 여부</h2></TableCell>
                  <TableCell colSpan="3" align="left">
                    <RadioGroup
                      row
                      aria-label="position"
                      value={inputClassInfo['use_state']}
                      name="use_state"
                      onChange={event => inputChangeHandle(event)}
                    >
                      <FormControlLabel
                        value={"YSE"}
                        control={<Radio color="primary"/>}
                        label="개시"
                      />
                      <FormControlLabel
                        value={"NO"}
                        control={<Radio color="primary" />}
                        label="미개시"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="4" align="center">
                    <FormControlLabel
                      control={<Checkbox checked={state.submitCheck} onChange={handleChange} name="submitCheck" />}
                      label="입력한 대로 수업을 수정합니다."
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan="4" align="right">
                    <Button variant="contained" color="primary" fullWidth style={{minHeight:70}} onClick={event => updateClassSubmit(event)}>
                      수업 수정
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <CustomConfirmDialog
            title={"강의 계획서 삭제"}
            content={"정말 강의 계획서를 삭제하시겠습니까?"}
            open={dialogState}
            closeHandle={()=>setDialogState(false)}
            handleYseClick={fileDeleteHandle}
          />
        </Grid>
    </div>
  );
};

export default UpdateClass;

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
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    submitCheck:false
  });
  const [classFileUpload, setClassFileUpload] = useState();
  const [inputClassInfo,setInputClassInfo] = useState(useSelector(state=>state['Class']['classInfo']));
  const inputChangeHandle = event => {
    const updateClassInfo = {
      ...inputClassInfo,
      [event.target.name]: event.target.value
    };
    setInputClassInfo(updateClassInfo);
  };

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const fileUploadHandle = event => {
    let _fileLen = event.target.value.length;
    let _lastDot = event.target.value.lastIndexOf('.');
    let _fileExt = event.target.value.substring(_lastDot, _fileLen).toLowerCase();
    if(_fileExt !== '.xlsx'){
      event.target.value = "";
      setClassFileUpload(null);
      dispatch(SHOW_MESSAGE_ACTION.show_message({content:"엑셀 형식만 업로드 가능합니다.",visible:true}));
      return;
    }
    setClassFileUpload(event.target.files[0]);
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
    // setTimeout(() => {
    //   let addClassInfo = {
    //     ...inputClassInfo
    //   };
    //   let classMenuSelect = 'REPORT,';
    //   for (let i=0;i<checkedMenuResult.length;i++) {
    //     classMenuSelect += checkedMenuResult[i] + ',';
    //   }
    //   addClassInfo = {
    //     ...inputClassInfo,
    //     selectMenu: classMenuSelect,
    //     content:instance.getHtml()
    //   };
    //   axiosPost.postContainsData("/professor/class",getResponse,addClassInfo);
    // }, 1000);
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
    instance.setHtml(inputClassInfo['content']);
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
                    {inputClassInfo['plannerDocName'] ? <div>{inputClassInfo['plannerDocName']}&nbsp;&nbsp;
                    <Button variant="contained" color="primary" style={{minHeight:20}}>
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
                        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" disabled/>}
                        label="과 제"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                        label="공지사항"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
                        label="참고자료"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedD} onChange={handleChange} name="checkedD" />}
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
        </Grid>
    </div>
  );
};

export default UpdateClass;

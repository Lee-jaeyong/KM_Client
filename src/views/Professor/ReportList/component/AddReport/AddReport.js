import React, { useEffect, useRef,useState, createElement } from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Chip,
  LinearProgress,
  FormGroup,
  Switch,
  Collapse
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';

import * as axiosPost from '@axios/post';

import FileUpload from './FileUpload';
import ImageUpload from './ImageUpload';

import { useDispatch } from 'react-redux';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AddReport(props) {
  const dispatch = useDispatch();

  const name = useRef([]);
  const type = useRef([]);
  const content = useRef([]);

  const [open, setOpen] = React.useState(false);
  const [progressState,setProgressState] = useState(false);
  const [imgProgressState,setImgProgressState] = useState(false);
  const [files,setFiles] = useState([]);
  const [imgs,setImgs] = useState([]);
  const [dateState, setDateState] = React.useState(false);

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };
  
  const btnSubmit = event => {
    console.log(imgs);
    const selectMenu = document.getElementsByName('selectMenu');
    let resultSelectMenu = [];
    for(let i =0;i<selectMenu.length;i++){
      if(selectMenu[i].checked){
        resultSelectMenu.push(selectMenu[i].value);
      }
    }
    event.preventDefault();
    if(name.current.value.trim() === ''){
      name.current.focus();
      dispatch(
        SHOW_MESSAGE_ACTION.show_message({
          content: '과제명을 입력해주세요.',
          visible: true
        })
      );
      return;
    }else if(type.current.value === undefined){
      type.current.focus();
      dispatch(
        SHOW_MESSAGE_ACTION.show_message({
          content: '수업 타입을 선택해주세요.',
          visible: true
        })
      );
      return;
    }
    const AddReportInfo = {
      name : name.current.value,
      type : type.current.value,
      content : content.current.value,
      selectMenu : resultSelectMenu
    }
    console.log(AddReportInfo);
    console.log(files);
    setTimeout(() => {
      axiosPost.postContainsData(
        '/api/professor/class',
        getResponse,
        AddReportInfo
      );
    },1000);
    handleClose();
  }

  const getResponse = res => {
    if (files.length !== 0) {
      let formData = new FormData();
      formData.append('file', files);
      axiosPost.postFileUpload(
        '/api/professor/uploadFile/' + res.seq + '/classInfoExcel',
        fileUploadResult,
        formData
      );
    }
    dispatch(
      SHOW_MESSAGE_ACTION.show_message({
        content: '과제 등록 완료',
        visible: true
      })
    );
    window.scrollTo(0, 0);
  };

  const imgUpload = file => {
    const fileName = file[0]['name'];
    let _fileLen = fileName.length;
    let _lastDot = fileName.lastIndexOf('.');
    let _fileExt = fileName
      .substring(_lastDot, _fileLen)
      .toLowerCase();
    if (_fileExt !== '.jpg' && _fileExt !== '.jpeg' && _fileExt !== '.png') {
      dispatch(
        SHOW_MESSAGE_ACTION.show_message({
          content: '이미지 형식의 파일을 업로드해주세요.',
          visible: true
        })
      );
      return;
    }
    setImgs(imgs.concat(file));
    let imgByte = [];
    setTimeout(() => {
      for(let i =0;i<file.length;i++){
        imgByte.push(getImgSource(file[i]));
      }
      console.log(imgByte);
      setImgProgressState(false);
    }, 1000);
    setImgProgressState(true);
  }

  async function getImgSource(file){
    const reader = new FileReader();
    reader.onload = await function(e){
      // let domImg = document.createElement("IMG");
      // domImg.src = e.target.result;
      // domImg.id = file['name'];
      // domImg.style.cssText = "width:100px;height:100px;" 
      // document.getElementById('imgSection').appendChild(domImg);
      return e.target.result;
    }
    reader.readAsDataURL(file);
  }

  const fileUpload = file => {
    const fileName = file[0]['name'];
    let _fileLen = fileName.length;
    let _lastDot = fileName.lastIndexOf('.');
    let _fileExt = fileName
      .substring(_lastDot, _fileLen)
      .toLowerCase();
    if (_fileExt === '.exe') {
      dispatch(
        SHOW_MESSAGE_ACTION.show_message({
          content: 'exe 파일 형식은 업로드 불가합니다.',
          visible: true
        })
      );
      return;
    }
    setTimeout(() => {
      setFiles(files.concat(file));
      setProgressState(false);
    }, 1000);
    setProgressState(true);
  }

  const fileUploadResult = (res) => {
    console.log(res);
  }

  const imgHandleDelete = (name) => {
    setImgs(imgs.filter(value=>value['name'] !== name));
  }

  const handleDelete = (name) => {
    setFiles(files.filter(value=>value['name'] != name));
  }

  const handleChange = () => {
    setDateState(!dateState);
  }

  useEffect(()=>{
    setOpen(props['open']);
    setFiles([]);
  },[props['open']]);

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          과제 등록<br/>
          <span style={{fontSize:15}}>과제의 기본 정보를 입력합니다.</span>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={4}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <TextField
                inputRef={name}
                variant="outlined"
                name="name"
                fullWidth
                label="과제명*"
                defaultValue=" "
                helperText="과제명은 필수 항목입니다."
                placeholder="과제명을 입력하세요."
              />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={dateState} onChange={handleChange} />}
                  label={dateState ? '사 용' : '미사용(기한 없음)'}
                />
                <div id="imgSection">
                </div>
                <Collapse in={dateState}>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} xl={6} xs={6}>
                      <TextField
                        id="datetime-local"
                        label="과제 시작일"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xl={6} xs={6}>
                      <TextField
                        id="datetime-local"
                        label="과제 종료일"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </FormGroup>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <ImageUpload addImg={imgUpload} files={files}/>
              {/* {imgs.length !== 0 ? (
                imgs.map((img,idx)=>{
                  return(
                    <div key={idx} style={{textAlign:"center"}}>
                      <br/>
                        <Chip
                          variant="outlined"
                          label={img['name']}
                          color="secondary" 
                          onDelete={()=>imgHandleDelete(img['name'])}
                        />
                    </div>
                  )
                })
              ): null} */}
              {
                imgProgressState ? 
                <LinearProgress color="secondary" style={{marginTop:5}}/>
                :
                null
              }
            </Grid>        
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <FileUpload addFile={fileUpload} files={files}/>
              {files.length !== 0 ? (
                files.map((file,idx)=>{
                  return (
                    <div key={idx} style={{textAlign:"center"}}>
                      <br/>
                        <Chip
                          variant="outlined"
                          label={file['name']}
                          color="secondary" 
                          onDelete={()=>handleDelete(file['name'])}
                        />
                    </div>
                  )
                })
              ): null}
              {
                progressState ? 
                <LinearProgress color="secondary" style={{marginTop:5}}/>
                :
                null
              }
            </Grid>            
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <TextField
                inputRef={content}
                label="과제 내용"
                multiline
                fullWidth
                rows="6"
                defaultValue=" "
                variant="outlined"
              />
            </Grid>            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={btnSubmit} color="primary">
            등 록
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
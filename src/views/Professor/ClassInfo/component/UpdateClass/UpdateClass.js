import React, { useEffect, useRef,useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button,Grid,TextField,FormControl,InputLabel,Select,MenuItem,FormHelperText,FormControlLabel,Checkbox,FormLabel,Card,CardContent,Chip} from '@material-ui/core';
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

export default function UpdateClass(props) {
  const {classInfo} = props;
  const dispatch = useDispatch();

  const name = useRef([]);
  const type = useRef([]);
  const content = useRef([]);

  const [open, setOpen] = React.useState(false);
  const [files,setFiles] = useState([]);

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };
  
  const btnSubmit = event => {
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
          content: '수업명을 입력해주세요.',
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
    const addClassInfo = {
      name : name.current.value,
      type : type.current.value,
      content : content.current.value,
      selectMenu : resultSelectMenu
    }
    console.log(addClassInfo);
    console.log(files);
    // setTimeout(() => {
    //   axiosPost.postContainsData(
    //     '/api/professor/class',
    //     getResponse,
    //     addClassInfo
    //   );
    // },1000);
    // handleClose();
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
        content: '수업 수정 완료',
        visible: true
      })
    );
    window.scrollTo(0, 0);
  };

  const fileUpload = file => {
    const fileName = file[0]['name'];
    let _fileLen = fileName.length;
    let _lastDot = fileName.lastIndexOf('.');
    let _fileExt = fileName
      .substring(_lastDot, _fileLen)
      .toLowerCase();
    if (_fileExt !== '.xlsx') {
      setFiles([]);
      dispatch(
        SHOW_MESSAGE_ACTION.show_message({
          content: '엑셀 형식만 업로드 가능합니다.',
          visible: true
        })
      );
      return;
    }
    setFiles(file[0]);
  }

  const fileUploadResult = (res) => {
    console.log(res);
  }

  const handleDelete = () => {
    setFiles([]);
  };

  useEffect(()=>{
    setOpen(props['open']);
  },[props['open']]);

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          수업 수정<br/>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={4}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <TextField
                inputRef={name}
                variant="outlined"
                name="name"
                fullWidth
                label="수업명*"
                defaultValue={classInfo['name']}
                helperText="수업명은 필수 항목입니다."
                placeholder="수업명을 입력하세요."
              />
            </Grid>            
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink>
                  수업 타입
                </InputLabel>
                <Select inputRef={type} defaultValue={classInfo['type']}>
                  <MenuItem value={'MAJOR'}>전 공</MenuItem>
                  <MenuItem value={'CULTURE'}>교 양</MenuItem>
                </Select>
                <FormHelperText>수업 타입을 선택해주세요.</FormHelperText>
              </FormControl>
            </Grid>            
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <FileUpload addFile={fileUpload} files={files}/>
              {files.length !== 0 ? (
                <div style={{textAlign:"center"}}>
                  <br/>
                    <Chip
                      variant="outlined"
                      label={files['name']}
                      color="secondary" 
                      onDelete={handleDelete}
                    />
                </div>
              ): null}
            </Grid>            
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <TextField
                inputRef={content}
                label="수업내용"
                multiline
                fullWidth
                rows="6"
                defaultValue={classInfo['content']}
                variant="outlined"
              />
            </Grid>            
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <FormLabel component="legend">선택 메뉴</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked
                    value="REPORT"
                    name="selectMenu"
                    color="primary"
                    disabled
                  />
                }
                label="과 제"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={classInfo['selectMenu'].indexOf("NOTICE") !== -1 ? true : false}
                    value="NOTICE"
                    name="selectMenu"
                    color="primary"
                  />
                }
                label="공지사항"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={classInfo['selectMenu'].indexOf("REFERENCE") !== -1 ? true : false}
                    value="REFERENCE"
                    name="selectMenu"
                    color="primary"
                  />
                }
                label="참고자료"
              />
            </Grid>            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={btnSubmit} color="primary">
            수 정
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
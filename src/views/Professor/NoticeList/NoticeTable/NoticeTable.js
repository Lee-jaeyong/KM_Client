import React, { useEffect, useState,useMemo  } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Divider,
  CardActions,
  CardContent,
  Button,
  Typography,
  Badge,
  Avatar,
  IconButton,
  Tooltip,
  CardActionArea
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function ReportList(props) {
  const {data,replyShowClick} = props;
  const [selectReport,setSelectReport] = useState(-1);
  const [updateReportState,setUpdateReportState] = useState(false);
  const [deleteReportState,setDeleteReportState] = useState(-1);
  let remainDataArr = [];
  for(let i =0;i<data.length;i++){
    if(data[i]['useSubmitDates'] !== 'NO'){
      let startDate = new Date(data[i]['startDate']).getTime();
      let endDate = new Date(data[i]['endDate']).getTime();
      remainDataArr.push(((endDate - startDate)/86400000) + "일 남음");
    }else{
      remainDataArr.push('과제 기한 없음');
    }
  }
  const [remainData] = useState(remainDataArr);

  const [deleteConfirmDialogState,setDeleteConfirmDialogState] = useState(
    {
      open : false,
      title : '',
      content : ''
    }
  ); 
  const getCheckedArr = () => {
    let checkedArr = [];
    for (let i = 0; i < data.length; i++) {
      checkedArr.push({
        isChecked: false
      });
    }
    return checkedArr;
  };

  const classes = useStyles();

  const [checked, setChecked] = useState(getCheckedArr());
  const [selectIdx, setSelectIdx] = useState(-1);

  const contentHandle = idx => {
    let _checked = checked;
    _checked[idx]['isChecked'] = !_checked[idx]['isChecked'];
    setChecked(_checked);
    setSelectIdx(idx);
  };

  const updateReport = idx => {
    for(let i =0;i<data.length;i++){
      if(data[i]['seq'] === idx){
        setSelectReport(data[i]);
        setUpdateReportState(true);
        break;
      }
    }
  }

  const deleteReport = idx => {
    setDeleteReportState(idx);
    setDeleteConfirmDialogState({
      open:true,
      title:'과제 삭제',
      content :'과제 삭제시 복구가 불가하며 제출했던 모든 기록 또한 삭제됩니다. 해당 과제를 정말 삭제하시겠습니까?'
    })
  }

  const deleteYseClickHandle = () => {
    alert('fdsfds');
  }

  const readReport = (idx) => {
    for(let i =0;i<data.length;i++){
      if(data[i]['seq'] === idx){
        props.readReportHandle(data[i]);
        break;
      }
    }
  }

  useEffect(() => {
    setChecked(getCheckedArr());
  }, [data]);

  return (
    <div>
      {data
        ? data.map((report, idx) => (
            <Card key={idx} style={{ marginBottom: 20 }}>
              <CardContent>
                <Avatar
                  variant="rounded"
                  style={{ backgroundColor: 'skyBlue' }}>
                  <AssignmentIcon />
                </Avatar>
                <div style={{ marginTop: 5 }}>
                  <IconButton aria-label="update" className={classes.margin} onClick={()=>updateReport(report['seq'])}>
                    <CreateIcon />
                  </IconButton>
                  <IconButton aria-label="delete" className={classes.margin} onClick={()=>deleteReport(report['seq'])}>
                    <DeleteForeverIcon />
                  </IconButton>
                </div>
                  <CardActionArea 
                    onClick={()=>readReport(report['seq'])}
                  >
                        <Typography
                          variant="h5"
                          component="h2"
                          style={{ marginTop: 10 }}>
                          {report['name']}
                          {report['fileList'] ?
                          (
                          <Tooltip title="파일 혹은 이미지가 첨부됨" placement="right">
                            <FileCopyIcon style={{position:'relative', top:3}}/> 
                          </Tooltip>
                          )
                          : null}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          {remainData[idx]}
                        </Typography>
                      <Typography variant="body2" component="p">
                          {report['content'].substring(0, 20)} .....더보기<br/><br/>
                           <FingerprintIcon style={{position:"relative",top:5}}/>
                           <span 
                            onMouseOver={(event)=>event.target.style.textDecoration = 'underline'}
                            onMouseLeave={(event)=>event.target.style.textDecoration = ''}
                           >
                            과제 정보 및 제출자 명단 보 기
                            </span>
                        </Typography>
                  </CardActionArea>
              </CardContent>
              <Divider light />
              <CardActions>
                <Button
                  size="small"
                  style={{ marginTop: 5, marginLeft: 5 }}
                  onClick={replyShowClick(idx)}>
                  과제 댓글 보기
                  <Badge
                    badgeContent={99}
                    color="secondary"
                    children={<MailIcon />}
                  />
                </Button>
              </CardActions>
              <Divider />
            </Card>
          ))
        : null}
    </div>
  );
}

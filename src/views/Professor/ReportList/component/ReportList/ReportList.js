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
import UpdateReportMoal from './UpdateReport/UpdateReportMoal';
import CustomConfirmDialog from '@common/component/CustomConfirmDialog';

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
                  <CardActionArea>
                    <Link to={"/class/"+props.match.params.idx}>
                        <Typography
                          variant="h5"
                          component="h2"
                          style={{ marginTop: 10 }}>
                          {report['name']}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          {report['remainDate']} 일 남음
                        </Typography>
                      <Typography variant="body2" component="p">
                        {checked[idx] ? (
                          checked[idx]['isChecked'] ? (
                            report['content']
                          ) : (
                            <span>
                              {report['content'].substring(0, 20)}
                            </span>
                          )
                        ) : (
                          <span>
                            {report['content'].substring(0, 20)}
                            <span
                              style={{
                                marginLeft: 10,
                                fontSize: 12,
                                color: '#6799FF'
                              }}
                              onClick={() => contentHandle(idx)}>
                              ....더보기
                            </span>
                          </span>
                        )}
                        </Typography>
                    </Link>
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
        <UpdateReportMoal open={updateReportState} reportInfo={selectReport} handleClose={()=>setUpdateReportState(false)}/>
        <CustomConfirmDialog 
          open={deleteConfirmDialogState['open']} 
          title={deleteConfirmDialogState['title']} 
          content={deleteConfirmDialogState['content']} 
          handleYseClick={deleteYseClickHandle}
          closeHandle={()=>{
            setDeleteConfirmDialogState({
              ...deleteConfirmDialogState,
              open : false,
            });
          }}
        />
    </div>
  );
}

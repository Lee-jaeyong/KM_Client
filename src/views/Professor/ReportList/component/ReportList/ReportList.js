import React from 'react';
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
    Collapse,
    TextField,
    IconButton
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SendIcon from '@material-ui/icons/Send';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const replyData = [
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
    {id:'14731060',name:'이재용',content:'안녕하세요'},
]

const useStyles = makeStyles({
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function ReportList({data}) {
    const classes = useStyles();

    let checkedArr = [];
    for(let i =0;i<data.length;i++){
        checkedArr.push(
            {
                isChecked : false
            }
        );
    }

    const [checked, setChecked] = React.useState(checkedArr);

    const replyCollspseHandle = (idx) => {
        let _checked = checked;
        _checked[idx]['isChecked'] = !_checked[idx]['isChecked'];
        setChecked(_checked);
    }

    return (
        <div>
            {data ? data.map((report,idx)=>
                (
                <Card style={{marginBottom:20}}>
                    <CardContent>
                        <Avatar variant="rounded" style={{backgroundColor:'skyBlue'}}>
                            <AssignmentIcon />
                        </Avatar>
                        <div style={{marginTop:5}}>
                        <IconButton aria-label="delete" className={classes.margin}>
                            <CreateIcon/>
                        </IconButton>
                        <IconButton aria-label="delete" className={classes.margin}>
                            <DeleteForeverIcon/>
                        </IconButton>
                        </div>
                        <Typography variant="h5" component="h2" style={{marginTop:10}}>
                        {report['name']}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {report['remainDate']} 일 남음
                        </Typography>
                        <Typography variant="body2" component="p">
                        {report['content']}....
                        </Typography>
                    </CardContent>
                        <Divider light />
                    <CardActions>
                    <Button size="small" style={{marginTop:5, marginLeft:5}} onClick={()=>replyCollspseHandle(idx)}>
                        수업 댓글
                        <Badge badgeContent={99} color='secondary' children={<MailIcon />} />
                    </Button>
                    </CardActions>
                    <Divider/>
                        {/* <Table key={idx} className={classes.table} aria-label="simple table">
                            <TableBody>
                                {replyData.map((reply,idx)=>{
                                    return (
                                        <TableRow key={reply.name}>
                                            <TableCell style={{minWidth:10}}>
                                                <Avatar/>{checked[idx]['isChecked'] ? 'fsdfsdfds' : 'azzz'}
                                            </TableCell>
                                            <TableCell align="center">{reply['id']}</TableCell>
                                            <TableCell align="center">{reply['name']}</TableCell>
                                            <TableCell align="center">{reply['content']}</TableCell>
                                        </TableRow>
                                        );
                                    })}
                                <TableRow>
                                    <TableCell/>
                                    <TableCell colSpan={2} align="center">
                                        <TextField id="outlined-basic" label="댓글 작성" variant="outlined" fullWidth />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary">
                                            댓글 작성&nbsp;
                                            <SendIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table> */}
                </Card>
                )
            ):null}
        </div>
    );
}
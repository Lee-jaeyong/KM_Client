import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

export default function ReportReply(props) {
    const {replyList} = props;
  return (
    <div style={{height:180, overflowY:'auto'}}>
        {replyList ? replyList.map((reply,idx)=>{
            return(
                <CardHeader
                  key={idx}
                  avatar={
                    <Avatar aria-label="recipe">
                    </Avatar>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
            )
        }) : null}
    </div>
  );
}
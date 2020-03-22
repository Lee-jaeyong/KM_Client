import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useSelector, useDispatch } from 'react-redux';
import * as SHOW_MESSAGE_ACTION from '@store/actions/MessageActions';

export default function CustomMessageBox(props) {
  const messageState = useSelector(
    state => state['MessageBox']['messageState']
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let message = {
      content: '',
      level: '',
      visible: false
    };
    dispatch(SHOW_MESSAGE_ACTION.show_message(message));
  },[]);

  useEffect(() => {
    setTimeout(() => {
      let message = {
        content: '',
        level: '',
        visible: false
      };
      dispatch(SHOW_MESSAGE_ACTION.show_message(message));
    }, 6000);
  },[messageState]);

  return (
    <Snackbar
      open={messageState['visible']}
      message={messageState['content']}
    />
  );
}

const SHOW_MESSAGE = 'SHOW_MESSAGE';

const initialState = {
  messageState : {
    content:'',
    level:'',
    visible:false,
  }
};

const MessageBox_state = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return{
        ...state,
        messageState:{
          content:action.content,
          level:action.level,
          visible:true 
        }
      };
    default:
      return state;
  }
};

export default MessageBox_state;
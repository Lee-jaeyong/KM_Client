const MESSAGE = 'MESSAGE';

const initialState = {
    message : []
};

const Message_state = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE:
      return{
        ...state,
        message : [...state.message,action.message]
    };
    default:
      return state;
  }
};

export default Message_state;
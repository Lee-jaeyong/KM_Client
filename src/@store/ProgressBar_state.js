const SHOW_PROGRESSBAR = 'SHOW_PROGRESSBAR';

const initialState = {
    visible : false
};

const ProgressBar_state = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PROGRESSBAR:
      return{
        ...state,
        visible : action.visible
      };
    default:
      return state;
  }
};

export default ProgressBar_state;
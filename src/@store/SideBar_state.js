const UPDATE = 'UPDATE';

const initialState = {
    isUpdate:false
};

const SideBar_state = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return{
        ...state,
        isUpdate:action.isUpdate
      };
    default:
      return state;
  }
};

export default SideBar_state;
const CLASS_SAVE = 'CLASS_SAVE';

const initialState = {
    classInfo : {
    }
};

const Class_state = (state = initialState, action) => {
  switch (action.type) {
    case CLASS_SAVE:
      return{
        ...state,
        classInfo:{
          ...state.classInfo,
          ...action.classInfo
        }
      };
    default:
      return state;
  }
};

export default Class_state;
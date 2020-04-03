const SAVE_CLASS = 'SAVE_CLASS';
const FILEUPLOAD_CLASS = "FILEUPLOAD_CLASS";

const initialState = {
    classInfo : {
    }
};

const Class_state = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CLASS:
      return{
        ...state,
        classInfo:{
          ...state.classInfo,
          ...action.classInfo
        }
      };
    case FILEUPLOAD_CLASS :
      return {
        ...state,
        classInfo : {
          ...state.classInfo,
          plannerDocName:action.fileInfo
        }
      }
    default:
      return state;
  }
};

export default Class_state;
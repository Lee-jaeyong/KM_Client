const SELECT_CLASS = 'SELECT_CLASS';

const initialState = {
    selectClass : {
        classIdx : -1,
    }
};

const SelectUtil_state = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CLASS:
      return{
        ...state,
        selectClass:{
            classIdx:action.classIdx,
        }
      };
    default:
      return state;
  }
};

export default SelectUtil_state;
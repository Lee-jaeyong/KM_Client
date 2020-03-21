const REDIRECT = 'REDIRECT';

const initialState = {
    redirect : {
      isRedirect : false
    }
};

const Redirect_state = (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT:
      return{
        ...state,
        redirect:{
            isRedirect:action.isRedirect,
            url:action.url
        }
      };
    default:
      return state;
  }
};

export default Redirect_state;
import { combineReducers } from 'redux';
import MessageBox from './MessageBox_state';
import Redirect from './Redirect_state'; 
import SelectUtil from './SelectUtil_state';

const rootReducer = combineReducers({
    MessageBox,Redirect,SelectUtil
});

export default rootReducer;
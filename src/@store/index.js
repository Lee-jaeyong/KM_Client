import { combineReducers } from 'redux';
import MessageBox from './MessageBox_state';
import Redirect from './Redirect_state'; 
import SelectUtil from './SelectUtil_state';
import Class from './Class_state';
import ProgressBar  from './ProgressBar_state';
import SideBar from './SideBar_state';

const rootReducer = combineReducers({
    MessageBox,Redirect,SelectUtil,Class,ProgressBar,SideBar
});

export default rootReducer;
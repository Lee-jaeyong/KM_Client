const SAVE_REPORT = 'SAVE_REPORT';
const FILEUPLOAD_REPORT_IMG = "FILEUPLOAD_REPORT_IMG";
const FILEUPLOAD_REPORT_FILE = "FILEUPLOAD_REPORT_FILE";

const initialState = {
    reportInfo : {
    }
};

const Report_state = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_REPORT:
      return{
        ...state,
        reportInfo:{
          ...state.reportInfo,
          ...action.reportInfo
        }
      };
    case FILEUPLOAD_REPORT_IMG :
      return {
        ...state,
        reportInfo : {
          ...state.reportInfo,
          imgList:action.imgList
        }
      }
    case FILEUPLOAD_REPORT_FILE :
      return {
        ...state,
        reportInfo : {
          ...state.reportInfo,
          fileList:action.fileList
        }
      }
    default:
      return state;
  }
};

export default Report_state;
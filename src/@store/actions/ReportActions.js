export function save_report(reportInfo){
    return{
        type:"SAVE_REPORT",
        reportInfo : reportInfo
    }
}

export function fileUpload_report_IMG(fileInfo){
    return{
        type:"FILEUPLOAD_REPORT_IMG",
        imgList : fileInfo
    }
}

export function fileUpload_report_FILE(fileInfo){
    return{
        type:"FILEUPLOAD_REPORT_FILE",
        fileList : fileInfo
    }
}
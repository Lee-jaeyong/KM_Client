export function save_class(classInfo){
    return{
        type:"SAVE_CLASS",
        classInfo : classInfo
    }
}

export function fileUpload_class(fileInfo){
    return{
        type:"FILEUPLOAD_CLASS",
        fileInfo : fileInfo
    }
}
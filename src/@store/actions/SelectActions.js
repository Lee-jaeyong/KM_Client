export function selectClass(classIdx,className){
    return{
        type:"SELECT_CLASS",
        classIdx:classIdx,
        className:className
    }
}
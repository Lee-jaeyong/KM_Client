import {replaceAll} from './ReplaceAll';

export function ConvertNotXssFilter(str){
    return replaceAll(replaceAll(str,"&lt;","<"),"&gt;",">");
}
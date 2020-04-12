export function getMessage(messasge){
    return{
        type:"MESSAGE",
        author:messasge.author,
        authorId:messasge.authorId,
        message:messasge.message
    }
}
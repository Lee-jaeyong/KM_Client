export function show_message(message_state){
    return{
        type:"SHOW_MESSAGE",
        content:message_state.content,
        level:message_state.level
    }
}
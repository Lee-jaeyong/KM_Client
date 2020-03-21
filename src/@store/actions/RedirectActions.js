export function isRedirect(redirect,url){
    return{
        type:"REDIRECT",
        isRedirect:redirect,
        url:url
    }
}
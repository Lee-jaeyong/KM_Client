import axios from 'axios';

export async function postNotContainsData(URL,func){
    axios.post(URL).then(res=>func(res.data));
}

export async function postFileUpload(URL,func,formData){
    axios.post(URL,formData).then(res=>func(res.data));
}

export async function postContainsData(URL,func,data){
    axios.post(URL,data,{
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>func(res.data));
}

export async function getAccessToken(func){
    axios.defaults.headers.common['Authorization'] = 'Basic S01hcHA6cGFzcw==';
    axios.post("http://localhost:8090/oauth/token?grant_type=password&username=dlwodyd202&password=dlwodyd",{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res=>func(res.data));
}
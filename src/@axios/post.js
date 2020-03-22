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
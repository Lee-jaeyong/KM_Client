import axios from 'axios';

export async function putFileUpload(URL,func,formData){
    axios.put(URL,formData).then(res=>func(res.data));
}

export async function putContainsData(URL,func,data){
    axios.put(URL,data,{
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>func(res.data));
}
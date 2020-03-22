import axios from 'axios';

export async function getNotContainsData(URL,func){
    axios({
        url: URL,
        method: 'get'
    }).then(
        res=>func(res.data)
    );
}

export async function getContainsData(URL,func,data){
    alert('a');
}
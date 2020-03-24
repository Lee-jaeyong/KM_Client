import axios from 'axios';

export async function deleteNotContainsData(URL,func){
    axios.delete(URL).then(res=>func(res.data));
}
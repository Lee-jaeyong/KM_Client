import axios from 'axios';

const accessToken = (res) => {
    localStorage.setItem('access_token',res['access_token']);
    localStorage.setItem('token_type',res['token_type']);
    localStorage.setItem('expires_in',res['expire_in']);
    localStorage.setItem('refresh_token',res['refresh_token']);
}

export async function getAccessToken(user){
    axios.defaults.headers.common['Authorization'] = 'Basic S01hcHA6cGFzcw==';
    axios.post("http://localhost:8090/oauth/token?grant_type=password&username="+user.id+"&password="+user.pass+"",{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res=>{
        accessToken(res['data']);
        setInterval(() => {
            getAccessToken(user);
        }, parseInt(res.data['expires_in']) * 1000);
    });
}
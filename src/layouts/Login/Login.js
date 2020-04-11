import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as Oauth from '@oauth/AcessToken';

export default function Login(props) {

  const loginHandle = () => {
    const user = {
      id: 'dlwodyd202',
      pass: 'dlwodyd'
    };
    Oauth.getAccessToken(user);
    props['children']['props']['history'].push('/dashboard');
  }

  useEffect(()=>{
  },[]);
  
  return (
    <Grid container spacing={2}>
      <Button onClick={loginHandle}>로그인</Button>
    </Grid>
  );
}
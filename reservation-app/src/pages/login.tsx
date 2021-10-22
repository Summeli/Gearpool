import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';
import "./login.css";
import { useUser } from '../components/usercontext';
import Footer from '../components/footer';

const Login: React.FunctionComponent = () => {
  const { authenticated,setAuthenticated,setUser,setAdmin} = useUser();

  if(!setAuthenticated || !setUser || !setAdmin){
    return null;
  }
  const google_clientId = "296938630298-cmbv8hsv7vn7nb78sv7t6uak1jpq1bop.apps.googleusercontent.com"
  
  const responseGoogle = (response: any) => {
    axios({
      method: 'post',
      url: "/api/login",
      withCredentials: true,
      data: {
        token_id : response.getAuthResponse().id_token
      }
    }).then((_resp :any) => {
      setAuthenticated(true);
      setUser(_resp.data.username);
      setAdmin(_resp.data.isAdmin);
    });
  
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <Route exact path="/">
        {authenticated ? <Redirect to="/home" /> : 
              <GoogleLogin
              clientId={google_clientId}
              buttonText="Log in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}/>
              }
      </Route>
      <Footer />
    </div>
  );
}

export default Login;
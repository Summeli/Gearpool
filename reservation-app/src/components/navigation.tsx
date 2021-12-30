import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './usercontext';


const Navigation: React.FunctionComponent = () => {
    const { authenticated,setAuthenticated, user,admin} = useUser();
    let loginstatus= "Login"
    if(!setAuthenticated){
      return null;
    }
    if(authenticated && user){
        loginstatus=user;
    }

    const logout  = () => {
          //post new projects to backend
    axios.post("/api/logout", {
      }).then(function (response) {
        setAuthenticated(false);
    }).catch(function (error) {
      console.log(error);
    }); 
    };

    return ( <nav className="navigation">
        <ul>
          <li>
            <Link to="/">{loginstatus}</Link>
          </li>
          {authenticated ? ( <li> <Link to="/home/">Home</Link> </li>) : ""}
          {authenticated && admin ? ( <li><Link to="/inventory/">Inventory</Link></li>) : ""}
          {authenticated && admin ? ( <li><Link to="/userpermissions">Users</Link></li>) : ""}
          {authenticated ? ( <li className='logout-button' onClick={logout}><Link to="/">Logout</Link></li>) : ""}
        </ul>
      </nav>
    )};

export default Navigation;
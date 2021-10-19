import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './usercontext';


const Navigation: React.FunctionComponent = () => {
    const { authenticated,user,admin} = useUser();
    let loginstatus= "Login"

    if(authenticated && user){
        loginstatus=user;
    }

    return ( <nav className="navigation">
        <ul>
          <li>
            <Link to="/">{loginstatus}</Link>
          </li>
          {authenticated ? ( <li> <Link to="/home/">Home</Link> </li>) : ""}
          {authenticated ? ( <li><Link to="/inventory/">Inventory</Link></li>) : ""}
          {authenticated && admin ? ( <li><Link to="/userpermissions">Users</Link></li>) : ""}
          {authenticated ? ( <li className='logout-button' ><Link to="/Logout">Logout</Link></li>) : ""}
        </ul>
      </nav>
    )};

export default Navigation;
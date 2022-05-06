import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerIcon from './hamburgericon';
import { useUser } from './usercontext';


const Navigation: React.FunctionComponent = () => {
    const { authenticated,setAuthenticated, user,admin,isNavExpanded, setIsNavExpanded} = useUser();

    let loginstatus: String = "Login";

    if(!setAuthenticated || !setIsNavExpanded){
      return null;
    }
    if(authenticated && user){
        loginstatus="Howdy, " + user;
    }

    const logout  = () => {
          //post new projects to backend
      axios.post("/api/logout", {})
          .then(function (response) {
            setAuthenticated(false);})
          .catch(function (error) {
            console.log(error);
        });
        setIsNavExpanded(false); 
    };

    return ( <nav className="navigation">
              <Link to="/" className="login-status">{loginstatus}</Link>
              <button className="hamburger" onClick={() => {setIsNavExpanded(!isNavExpanded);}}><HamburgerIcon /></button>  
              <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>        
                <ul>
                  {authenticated ? ( <li> <Link to="/home/" onClick={() => {setIsNavExpanded(false);}}>Home</Link> </li>) : ""}
                  {authenticated && admin ? ( <li><Link to="/inventory/" onClick={() => {setIsNavExpanded(false);}} >Inventory</Link></li>) : ""}
                  {authenticated && admin ? ( <li><Link to="/userpermissions"  onClick={() => {setIsNavExpanded(false);}}>Users</Link></li>) : ""}
                  {authenticated ? ( <li className='logout-button' onClick={logout}><Link to="/">Logout</Link></li>) : ""}
                </ul>
            </div>
      </nav>
    )};

export default Navigation;
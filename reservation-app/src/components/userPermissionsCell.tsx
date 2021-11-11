import { format } from 'date-fns';
import React from 'react';

type Props = {
    user: string;
    userName : string;
    lastLogin : Date;
    isAdmin : boolean;
    rmMode : boolean; //if true, give remove button
    isAdminCallback: (user: string, isAdmin: boolean) => void;
    rmUserCallback: (user: string) => void;
  };
  

const UserPermissionCell: React.FunctionComponent<Props> = (props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
        props.isAdminCallback(props.user, e.currentTarget.checked);
    }
    const rmUser = (e: React.MouseEvent<HTMLButtonElement>)=> {    
      props.rmUserCallback(props.user);
    }

    return (<div className="user">
        <div className="user-name">{props.userName}</div>
        <div className="user-email"> email: {props.user} </div>
        <div className="user-lastlogin">last login: {format(props.lastLogin, 'dd/MMM/yy')} </div>
        <div className="user-admin-txt"> is admin: 
          <input className="user-isadmin" type="checkbox" checked={props.isAdmin} onChange={handleChange} /> 
        </div>
        {props.rmMode ? <button className="rm-user-button" onClick={rmUser} key={props.user}>rm User</button> : <div />}
  </div>);
};

export default UserPermissionCell;
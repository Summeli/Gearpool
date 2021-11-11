import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import { useUser } from '../components/usercontext';
import axios from 'axios';
import UserPermissionCell from '../components/userPermissionsCell';
import "./userPermissions.css";

export interface UserPermissions {
  user: string;
  userName : string;
  lastLogin : Date;
  isAdmin : boolean;
}

export interface UpdateUserPermissions{
  user: string;
  isAdmin: boolean;
}

const UserPermissionsPage: React.FunctionComponent = () => {
  const { authenticated,setAuthenticated,admin} = useUser();
  const [users, setUsers] = useState(new Array<UserPermissions>());
  const [rmUsersMode, setRmUsersMode] = useState(false);

  React.useEffect(() => {
    axios
      .get<UserPermissions[]>("/api/userpermissions")
      .then((response : any) => {
        let resp_users : UserPermissions[] = response.data;

        let cw : UserPermissions[] = new Array<UserPermissions>();
        //TODO: hack to get dates working with everything...
        for (let c of resp_users) {
            cw.push({user: c.user, userName: c.userName, isAdmin: c.isAdmin, lastLogin: new Date(c.lastLogin)});
        }
        setUsers(cw);
      });
  }, []);

  if(!setAuthenticated){
    return null;
  }

  const removeUsersModed = (e: React.MouseEvent<HTMLButtonElement>) => {    
    let rmMode = !rmUsersMode;
    setRmUsersMode(rmMode);
  }

  const rmUser = (user: string) => {
    console.log("remove user", user);
    axios
      .delete<UserPermissions[]>("/api/userpermissions/"+user)
      .then((response : any) => { 
        let resp_users : UserPermissions[] = response.data;
        let cw : UserPermissions[] = new Array<UserPermissions>();
        //TODO: hack to get dates working with everything...
        for (let c of resp_users) {
            cw.push({user: c.user, userName: c.userName, isAdmin: c.isAdmin, lastLogin: new Date(c.lastLogin)});
        }
        setUsers(cw);
      });
    }

  const setAdmin = (user: string, isAdmin: boolean) => {
    let update: UpdateUserPermissions = {user:user, isAdmin: isAdmin} as UpdateUserPermissions;
    let userpermission: String = JSON.stringify(update);
    //post new projects to backend
    axios.put("/api/userpermissions", {
      userpermission
    }).then((resp :any)=> {
      if(resp.status === 200){
        let resp_users : UserPermissions[] = resp.data;
        let cw : UserPermissions[] = new Array<UserPermissions>();
        for (let c of resp_users) {
            cw.push({user: c.user, userName: c.userName, isAdmin: c.isAdmin, lastLogin: new Date(c.lastLogin)});
        }
        setUsers(cw);
      }
    })
  }

  return (
    <div className="user-permissions-toplvl">
    <div className="user-permissions">
    {!authenticated  || !admin ? <Redirect to="/Logout" /> : ""}:
    {users.map(user => (
        <UserPermissionCell key={user.user} user={user.user} userName={user.userName} lastLogin={user.lastLogin} 
          isAdmin={user.isAdmin} rmMode={rmUsersMode} isAdminCallback={setAdmin} rmUserCallback={rmUser}/>
    ))}
    </div>
    <div className="users-remove-button-container">
      <button onClick={removeUsersModed}> {rmUsersMode ? "stop rm users" : "remove users"}</button>
    </div>
    </div>
  );
}

export default UserPermissionsPage;
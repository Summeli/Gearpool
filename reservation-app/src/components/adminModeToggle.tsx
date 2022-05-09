import React from 'react';
import { useReservationContext } from './reservationcontext';
import { useUser } from './usercontext';

const AdminModetoggle: React.FunctionComponent = () => {
  const {admin} = useUser();
  const {isAdminMode,toggleAdminMode} = useReservationContext();
  

  if(!toggleAdminMode){
    return null;
  }
  if(admin === false){
    return null;
  }

  const adminModeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleAdminMode();
    }


  return (
      <div className="admin-editor">
      {isAdminMode ? <button onClick={adminModeToggle}>Quit Admin</button> : 
      <button onClick={adminModeToggle}>Start Admin</button>}
      </div>
      )
};

export default AdminModetoggle;

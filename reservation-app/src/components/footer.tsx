import React from 'react';
import { useReservationContext } from './reservationcontext';

const Footer: React.FunctionComponent = () => {
    const { isAdminMode } = useReservationContext();
    if(isAdminMode === true)
        return null; //rm footer in admin for more space

    return (
        <div className="footer">
            <p>Copyright 2022 Antti Pohjola.</p>
        </div>);
  };
  
  export default Footer;
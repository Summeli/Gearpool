import { format, isSameDay } from 'date-fns';
import React from 'react';
import { useReservationContext } from './reservationcontext';

type Props = {
    date: Date
  };

const ReservedDayEditor: React.FunctionComponent<Props> = ({ date })=> {
    const {reservations, rmReservation} = useReservationContext();

    if(!reservations || !rmReservation)
        return null;

    let reservedBy : String = "";
    for(let reservation of reservations){
        if(isSameDay(reservation.date,date)){
            reservedBy = reservation.reservedBy;
        }
    }

    const removeReservation = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("REMOVE reservation")
        rmReservation(date);
    }

      
    return (
        <div className="admin-reservation" key = {format(date, 'd')}>
      
        {format(date, 'd') +"  "}:  reserved by: {reservedBy + "   "}
            <button onClick={removeReservation}>remove Reservation</button>
        </div>
    )
  
  };
  
  export default ReservedDayEditor;

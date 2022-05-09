import { addDays, endOfWeek, format, startOfWeek } from 'date-fns';
import React from 'react';
import { useReservationContext } from './reservationcontext';
import ReservedDayEditor from './reservedDayEditor';
import { useUser } from './usercontext';

const CalendarAdminMode: React.FunctionComponent = () => {
  const {admin} = useUser();
  const {isAdminMode,weekStartsOn,toggleAdminMode, selectedDate} = useReservationContext();
  

  if(!toggleAdminMode || !selectedDate){
    return null;
  }
  if(admin === false){
    return null;
  }
  if(isAdminMode === false)
    return null;

  const start = startOfWeek(selectedDate, {
    weekStartsOn: weekStartsOn,
  });
  const end = endOfWeek(selectedDate, {
    weekStartsOn: weekStartsOn,
  });

  let date = start;

  const dates: Date[] = [];
  while (date <= end) {
    dates.push(date);
    date = addDays(date, 1);
  }

  return (
      <div className="admin-editor">
      {dates.map(day => (
        <ReservedDayEditor key = {format(day, 'd')} date={day} />))}
      </div>
      )
};

export default CalendarAdminMode;

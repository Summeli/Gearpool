import React from 'react';
import { startOfWeek, format, addDays } from 'date-fns';
import { useReservationContext } from './reservationcontext';

const CalendarDays: React.FunctionComponent = () => {
  const { currentMonth,weekStartsOn } = useReservationContext();

  if (!currentMonth ) return null;

  const weekStart = startOfWeek(currentMonth, {
    weekStartsOn,
  });
  const days = [];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div key={i} className="calendar-day" data-testid="calendar-day">
        {format(addDays(weekStart, i), 'EEEEEE')}
      </div>
    );
  }

  return <div className="calendar-days">{days}</div>;
};

export default CalendarDays;
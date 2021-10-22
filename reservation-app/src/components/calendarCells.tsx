import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
import CalendarCell from './calendarCell';
import { useReservationContext } from './reservationcontext';

const CalendarCells: React.FunctionComponent = () => {
  const { weekStartsOn, currentMonth } = useReservationContext();

  if (!currentMonth) return null;

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const dateStart = startOfWeek(monthStart, {
    weekStartsOn: weekStartsOn,
  });
  const dateEnd = endOfWeek(monthEnd, {
    weekStartsOn: weekStartsOn,
  });
  const dates = [];

  let date = dateStart;

  while (date <= dateEnd) {
    dates.push(<CalendarCell key={format(date, 'T')} date={date} />);

    date = addDays(date, 1);
  }

  return <div className="calendar-cells">{dates}</div>;
};

export default CalendarCells;
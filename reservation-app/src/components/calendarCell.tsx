import React from 'react';
import { isSameMonth, isToday, format, isWeekend, isSameDay } from 'date-fns';
import { useReservationContext} from './reservationcontext';
import { isTodayReservedByMe, isTodayReservedBySomeone } from '../util/dateHelppers';

type Props = {
  date: Date;
};

const CalendarCell: React.FunctionComponent<Props> = ({ date }) => {
  const { selectedDate, reservations, currentMonth, reserveDate, isAdminMode, setSelectedDate } = useReservationContext();

  if (!currentMonth || !reserveDate || !reservations || !setSelectedDate) return null;

  const thisDate = date;

  let classes = 'calendar-cell';
  let isHoliday : boolean = false;

  if (selectedDate && isSameDay(date, selectedDate)) {
    classes += ' calendar-cell--selected';
  }
  
  if(isTodayReservedByMe(reservations, thisDate)) {
    classes += ' calendar-cell--reserved-by-me';
  }

  if(isTodayReservedBySomeone(reservations, thisDate)) {
    classes += ' calendar-cell--reserved-by-oks';
  } 

  if (isToday(date)) {
    classes += ' calendar-cell--today';
  }

  if (!isSameMonth(date, currentMonth)) {
    classes += ' calendar-cell--disabled';
  }

  if(isWeekend(date) || isHoliday ){
    classes += ' calendar-cell--holiday';
  }
  
  const doReservation = (date: Date) => {
    if(!isAdminMode) //no reservation in admin mode
      reserveDate(date);
    else
      setSelectedDate(date);
  };
  return (
    <div
      className={classes}
      onClick={() => isSameMonth(thisDate, currentMonth) && doReservation(thisDate)}
      data-testid="calendar-cell"
    >
      <div className="calendar-cell__date">
        <div className="calendar-cell-date">{format(date, 'd')}</div>
      </div>
    </div>
  );
};

export default CalendarCell;

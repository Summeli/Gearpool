import React from 'react';
import CalendarHeader from './calendarHeader';
import CalendarDays from './calendarDays';
import CalendarCells from './calendarCells';
import { ReservationContextProvider } from './reservationcontext';
import InventorySelector from './inventoryselector';
import CalendarExplanation from './CalendarExplanation';
import ItemSelectionNotifier from './itemSelectionNotifier';


export type CalendarWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarProps = {
  weekStartsOn?: CalendarWeekStartsOn;
};

const ReservationsCalendar: React.FunctionComponent<CalendarProps> = ({ weekStartsOn = 1 }) => (
  <ReservationContextProvider weekStartsOn={weekStartsOn}>
    <InventorySelector />
    <ItemSelectionNotifier />
    <CalendarHeader />
    <CalendarDays />
    <CalendarCells />
    <CalendarExplanation / >
  </ReservationContextProvider>
);
  
export default ReservationsCalendar;

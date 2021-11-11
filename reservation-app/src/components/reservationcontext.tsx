import React, { useContext, useState } from 'react';
import { addMonths, getMonth, subMonths,getYear, startOfMonth } from 'date-fns';
import { CalendarWeekStartsOn } from './reservationcalendar';
import axios, { AxiosError } from 'axios';
import { useUser } from './usercontext';

export type CalendarReservation = {
  date: Date;
  itemName: string;
  reservedBy: string;
};

export interface SelectableItem {
    name: string;
    type: string;
  }

type ReservationContext = {
  item: SelectableItem;
  setItem: (item: SelectableItem) => void;
  reservations: CalendarReservation[];
  setReservations: (items: CalendarReservation[] ) => void;
  weekStartsOn: CalendarWeekStartsOn;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  prevMonth: () => void;
  nextMonth: () => void;
};

// isable warning for redecalaration
// eslint-disable-next-line 
const ReservationContext = React.createContext<Partial<ReservationContext>>({});

export const useReservationContext = () => useContext(ReservationContext);

type ReservationContextProps = {
  children: React.ReactNode;
  weekStartsOn: CalendarWeekStartsOn;
};

export const ReservationContextProvider: React.FunctionComponent<ReservationContextProps> = ({
  children,
  weekStartsOn,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reservations, setReservations] = useState(new Array<CalendarReservation>());
  const [item, setItem] = useState({name:"",type:""});
  const changeMonth = (month: Date) => {
    setCurrentMonth(month);
  };
  const prevMonth = () => changeMonth(subMonths(currentMonth, 1));
  const nextMonth = () => changeMonth(addMonths(currentMonth, 1));

  const {setAuthenticated} = useUser();

  const handlerror = (error: AxiosError) => {
    if(error.response?.status === 401 && setAuthenticated){
      setAuthenticated(false);
    }
  }

  React.useEffect(() => {
    const handlerror = (error: AxiosError) => {
      if(error.response?.status === 401 && setAuthenticated){
        setAuthenticated(false);
      }
    }
        setSelectedDate(new Date());
  }, [currentMonth, setAuthenticated]);

  return (
    <ReservationContext.Provider
      value={{
        item,
        setItem,
        reservations,
        setReservations,
        weekStartsOn,
        currentMonth,
        setCurrentMonth,
        selectedDate,
        setSelectedDate,
        prevMonth,
        nextMonth,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
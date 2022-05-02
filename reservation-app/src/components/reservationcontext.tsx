import React, { useContext, useState } from 'react';
import { addMonths, getMonth, subMonths,getYear, startOfMonth } from 'date-fns';
import { CalendarWeekStartsOn } from './reservationcalendar';
import axios, { AxiosError } from 'axios';
import { useUser } from './usercontext';

export type ReservationResponse = {
  reservations: CalendarReservation[]
}

export type CalendarReservation = {
  date: Date;
  _id: string;
  itemName: string;
  reservedBy: string;
};

export interface SelectableItem {
    _id: string
    name: string;
    category: string;
  }

type ReservationContext = {
  item: SelectableItem;
  setItem: (item: SelectableItem) => void;
  selectItem: (item: SelectableItem) => void;
  reservations: CalendarReservation[];
  setReservations: (items: CalendarReservation[] ) => void;
  weekStartsOn: CalendarWeekStartsOn;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  inventory: SelectableItem[];
  setInventory: (inventory: SelectableItem[]) => void;
  reserveDate: (data: Date) => void;
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
  const [reservations, setReservations] = useState(new Array<CalendarReservation>());
  const [item, setItem] = useState({name:"",_id:"", category:""});
  const [inventory, setInventory] = useState(new Array<SelectableItem>());
  const changeMonth = (month: Date) => {
    setCurrentMonth(month);
  };
  const prevMonth = () => changeMonth(subMonths(currentMonth, 1));
  const nextMonth = () => changeMonth(addMonths(currentMonth, 1));

  const {setAuthenticated} = useUser();

  const reserveDate = (date: Date) => {
    console.log("date reserved");
 
  };

  const selectItem = (item: SelectableItem) => {
    //TODO: select item, get Calendar for that item, and set it.
    setItem(item);
  
  };

  React.useEffect(() => {
    const handlerror = (error: AxiosError) => {
      if(error.response?.status === 401 && setAuthenticated){
        setAuthenticated(false);
      }
    }
    axios
    .get<SelectableItem[]>("/api/inventory")
    .then(response => {
      setInventory(response.data);
    });
  }, [currentMonth, setAuthenticated]);

  return (
    <ReservationContext.Provider
      value={{
        item,
        selectItem,
        inventory,
        setInventory,
        reservations,
        setReservations,
        weekStartsOn,
        currentMonth,
        setCurrentMonth,
        prevMonth,
        nextMonth,
        reserveDate
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
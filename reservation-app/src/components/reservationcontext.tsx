import React, { useCallback, useContext, useState } from 'react';
import { addMonths, getMonth, subMonths,getYear, startOfMonth } from 'date-fns';
import { CalendarWeekStartsOn } from './reservationcalendar';
import axios, { AxiosError } from 'axios';
import { useUser } from './usercontext';
import { getReservations, makeReservation } from '../util/reservationHelper';

export type ReservationResponse = {
  reservations: ItemReservation[]
}

export type ItemReservation = {
  _id: string;
  itemId: String
  reservedBy: String
  month: number
  year: number
  date: number
}

export type CalendarReservation = {
  date: Date;
  itemId: String;
  reservedBy: String;
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

  const reserveDate = useCallback( async (date: Date) => {
    if(item._id !== null && item._id.length > 0){
      const reservations: CalendarReservation[]= await makeReservation(date, item._id);
      setReservations(reservations);
    }else{
      //TODO: show EROOR dialog that an iteam should be selected
    }
  },[item]);

  const selectItem =  useCallback( async (selected: SelectableItem) => {
    const reservations: CalendarReservation[] = await getReservations(currentMonth,selected._id);
    setReservations(reservations);
    setItem(selected);
  },[currentMonth]);;

  React.useEffect(() => {
    axios
    .get<SelectableItem[]>("/api/inventory")
    .then(response => {
      setInventory(response.data);
    });
  }, [setAuthenticated]);

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
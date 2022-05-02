import { isSameDay } from "date-fns";
import { CalendarReservation } from "../components/reservationcontext";

export function isTodayReservedBySomeone(reservations: CalendarReservation[], today: Date): boolean{
    for (var reservation of reservations) {
        if(isSameDay(reservation.date, today) && reservation.reservedBy === 'oks '){
            return true;
        }
    }
    return false;
}

export function isTodayReservedByMe(reservations: CalendarReservation[], today: Date): boolean{
    for (var reservation of reservations) {
        if(isSameDay(reservation.date, today) && reservation.reservedBy !== 'oks '){
            return true;
        }
    }
    return false;
}
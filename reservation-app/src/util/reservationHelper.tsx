import axios from "axios";
import { getDate, getMonth, getYear } from "date-fns";
import { getCommentRange } from "typescript";
import { CalendarReservation, ItemReservation, ReservationResponse } from "../components/reservationcontext";



export async function makeReservation(reservationDate: Date, itemId: string): Promise<CalendarReservation[]> {

    const month: number = getMonth(reservationDate);
    const year: number = getYear(reservationDate);
    const date: number = getDate(reservationDate);

    let id: String = JSON.stringify(itemId);
    //post new projects to backend
   return axios
        .post("/api/reservations/"+year+"/"+month+"/" + date +"?id="+id, {
        })
    .then(function (response) {
        if(response.status!==200) {
            return {} as CalendarReservation[];
         }
         let resp: ItemReservation[] = response.data as ItemReservation[];
         return convertItemToCalendar(resp);
    })
    .catch(function (error) {
        console.log("ERROR", error);
        let resp: ItemReservation[] = {} as ItemReservation[];
        return convertItemToCalendar(resp);
    }); 
  }

  export async function getReservations(date: Date, itemId: string): Promise<CalendarReservation[]> {

    const month : number = getMonth(date);
    const year : number = getYear(date);
    let id: String = JSON.stringify(itemId);

    //post new projects to backend
   return axios
        .get("/api/reservations/"+year+"/"+month+"?id="+id, {
        })
    .then(function (response) {
        if(response.status!==200) {
            return {} as CalendarReservation[];
         }
         let resp: ItemReservation[] =  response.data as ItemReservation[];
         return convertItemToCalendar(resp);
    }).catch(function (error) {
        console.log("ERROR", error);
        let resp: ItemReservation[] = {} as ItemReservation[];
        return convertItemToCalendar(resp);
    }); 
  }


function convertItemToCalendar(reservationresponse: ItemReservation[]): CalendarReservation[]{
    let resp : CalendarReservation[] = new Array<CalendarReservation>();
    for (var reservation of reservationresponse) {
        var d = new Date(reservation.year, reservation.month, reservation.date);
        let cres : CalendarReservation = {date: d, itemId: reservation.itemId, reservedBy: reservation.reservedBy} as CalendarReservation;
        resp.push(cres);
      }
      return resp;
}
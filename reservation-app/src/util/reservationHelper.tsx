import axios from "axios";
import { getDate, getMonth, getYear } from "date-fns";
import { CalendarReservation, ReservationResponse } from "../components/reservationcontext";



export async function makeReservation(reservationDate: Date, itemId: string): Promise<ReservationResponse> {

    const month: number = getMonth(reservationDate);
    const year: number = getYear(reservationDate);
    const date: number = getDate(reservationDate);

    let id: String = JSON.stringify(itemId);

    console.log("itemid is:", id)
    //post new projects to backend
   return axios
        .post("/api/reservations/"+year+"/"+month+"/" + date +"?id="+id, {
        })
    .then(function (response) {
        if(response.status!==200) {
            return {reservations: []} as ReservationResponse;
         }
         let resp: ReservationResponse = {reservations: []} as ReservationResponse;
         let reservations: CalendarReservation[] = response.data as CalendarReservation[];
         resp.reservations = reservations;
         return resp;
    })
    .catch(function (error) {
        console.log(error);
        let resp: ReservationResponse = {reservations: []} as ReservationResponse;
        return resp;
    }); 


  }


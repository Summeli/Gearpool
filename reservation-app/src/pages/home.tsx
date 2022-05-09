import React from "react";
import { Redirect } from "react-router-dom";
import ReservationsCalendar from "../components/reservationcalendar";
import { useUser } from "../components/usercontext";
import "./home.css";

const Home: React.FunctionComponent = () => {

  const { authenticated, isNavExpanded} = useUser();
  return (
    <div className="Home">
    {!authenticated ? <Redirect to="/" /> : 
      isNavExpanded ? <div /> : 
        <div className="calendar-wrapper">
          <ReservationsCalendar />
        </div> }
   </div> 
  );
};



export default Home;
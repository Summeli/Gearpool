import React from "react";
import { Redirect } from "react-router-dom";
import { useUser } from "../components/usercontext";
import "./home.css";

const Home: React.FunctionComponent = () => {

  const { authenticated} = useUser();
  return (
    <div className="Home">
    {!authenticated ? <Redirect to="/" /> : 
      <div className="calendar-wrapper">
        <div className="TODO-add-calendar" />
      </div> }
   </div> 
  );
};



export default Home;
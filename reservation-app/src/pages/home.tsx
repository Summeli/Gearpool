import React from "react";
import { Redirect } from "react-router-dom";
import Footer from "../components/footer";
import InventorySelector from "../components/inventoryselector";
import { useUser } from "../components/usercontext";
import "./home.css";

const Home: React.FunctionComponent = () => {

  const { authenticated} = useUser();
  return (
    <div className="Home">
    {!authenticated ? <Redirect to="/" /> : 
      <div className="calendar-wrapper">
        <InventorySelector></InventorySelector>
      </div> }
      <Footer />
   </div> 
  );
};



export default Home;
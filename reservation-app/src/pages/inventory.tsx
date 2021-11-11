import React from "react";
import { Redirect } from "react-router-dom";
import Footer from "../components/footer";
import { useUser } from "../components/usercontext";
import "./inventory.css";

export interface Item {
  name: string;
  category: Category;
  id?: string;
}

export interface Category {
  name: string;
  id?: string;
}
const InventoryPage: React.FunctionComponent = () => {

  const { authenticated} = useUser();
  return (
    <div className="Inventory">
    {!authenticated ? <Redirect to="/" /> : 
      <div className="inventory-wrapper">
      </div> }
      <Footer />
   </div> 
  );
};



export default InventoryPage;
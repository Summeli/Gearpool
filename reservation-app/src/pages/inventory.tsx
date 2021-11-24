import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Footer from "../components/footer";
import NewItemEditor from "../components/newItemEditor";
import { useUser } from "../components/usercontext";
import "./inventory.css";


export interface Item {
  name: string;
  category: string;
  id?: string;
};

const InventoryPage: React.FunctionComponent = () => {

  const { authenticated, setAuthenticated} = useUser();
  const [items, setItems] = useState(Array<Item>());
  const [categories, setCategories] = useState(Array<string>());
  const [addtem, setAddItem] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
 
  React.useEffect(() => {
    axios
      .get<Item[]>("/api/items")
      .then(response => {
        setItems(response.data);
      });

      //TODO: get also categories
  }, []);

  const removeItem = (name: string) => {
    const newProjs: Item[] = items.filter(function( obj ) {
      return obj.name !== name;
    });

    //post new projects to backend
    axios.post("/api/projects", {
      newProjs
    })
    .then(function (response) {
      setItems(newProjs);
      setAddItem(false);
      setAddCategory(false);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  const addItemView = (e: React.MouseEvent<HTMLButtonElement>) => {    
    setAddItem(true);
  }

  const addNewItem = (pname: string, pcategory: string) => {
    const newItem: Item = {name: pname, category: pcategory};    
    let newItems: Item[] = Array<Item>();
    Array.prototype.push.apply(newItems, items);
    newItems.push(newItem);

    //post new projects to backend
    axios.post("/api/inventory", {
      newItems
      }).then(function (response) {
        setItems(newItems);
        setAddItem(false);
        setAddCategory(false);
      }).catch(function (error) {
        if(error.response?.status === 401 && setAuthenticated){
          setAuthenticated(false);
       }
      });
    } 
  

  return (
    <div className="Inventory">
    {!authenticated ? <Redirect to="/" /> : 
      <div className="inventory-wrapper">

      </div> }
      {addtem ? (
            <NewItemEditor key="newItem" categories={categories} projectCallback={addNewItem} /> 
          ) : (
            <button onClick={addItemView}>new Item</button>
        )}
      <Footer />
   </div> 
  );
}

export default InventoryPage;
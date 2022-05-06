import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Footer from "../components/footer";
import NewCategoryEditor from "../components/newCategoryEditor";
import NewItemEditor from "../components/newItemEditor";
import { useUser } from "../components/usercontext";
import "./inventory.css";


export interface Item {
  _id: string;
  name: string;
  category: string;
};

export interface Category {
  _id: string;
  category: string;
};


const InventoryPage: React.FunctionComponent = () => {

  const { authenticated, setAuthenticated} = useUser();
  const [items, setItems] = useState(Array<Item>());
  const [categories, setCategories] = useState(Array<Category>());
  const [addItem, setAddItem] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
 
  React.useEffect(() => {
    axios
      .get<Item[]>("/api/inventory")
      .then(response => {
        setItems(response.data);
      });

      axios
      .get<Category[]>("/api/inventory/categories")
      .then(response => {
        setCategories(response.data);
      });
  }, []);

  const removeItem = (name: string) => {
    const newProjs: Item[] = items.filter(function( obj ) {
      return obj.name !== name;
    });

    //post new projects to backend
    axios.delete("/api/inventory/"+name,)
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
    //post new item to backend  
    axios.post("/api/inventory", {name: pname, category: pcategory})
      .then(function (response) {
        if(response.status!==200) {
          console.log("error");
        }
        let newItems: Item[] = response.data as Item[];
        setItems(newItems);
        setAddItem(false);
        setAddCategory(false);
      }).catch(function (error) {
        if(error.response?.status === 401 && setAuthenticated){
          setAuthenticated(false);
       }
      });
  } 
  const addNewCategory = (pname: string) => {
     //post new categories to backend
     axios.post("/api/inventory/categories/"+pname, {})
     .then(function (response) {
        if(response.status!==200) {
          console.log("error");
        }
        let newCategories: Category[] = response.data as Category[];
        setCategories(newCategories);
        setAddItem(false);
        setAddCategory(false);
      }).catch(function (error) {
        if(error.response?.status === 401 && setAuthenticated){
          setAuthenticated(false);
       }
      });
  };

  const removeCategory = (pname: string) => {
    //delete category
    axios.delete("/api/inventory/categories/"+pname, {})
    .then(function (response) {
       if(response.status!==200) {
         console.log("error");
       }
       let newCategories: Category[] = response.data as Category[];
       setCategories(newCategories);
       setAddItem(false);
       setAddCategory(false);
     }).catch(function (error) {
       if(error.response?.status === 401 && setAuthenticated){
         setAuthenticated(false);
      }
    });
  };
  
  const newCategoryCallback = () => {
    setAddCategory(true);
  };
  
  return (
    <div className="Inventory">
    <h2>Inventory</h2>
    {!authenticated ? <Redirect to="/" /> : 
      <div className="inventory-wrapper">
        <ul>
        {!addCategory && items && items.map(item =>
              <li key={item._id}>
                  <div>{item.name}  - category: {item.category} ----<button onClick={ () => {removeItem(item.name);}}>removeMe</button></div>
              </li>
          )}
          </ul>
      </div> }
      {addCategory ? (
        <NewCategoryEditor newCategoryCallback={addNewCategory}/ >
      ):
        <div />
      } 
      {!addCategory && addItem ? (
            <NewItemEditor key="newItem" categories={categories} newItemCallback={addNewItem} newCategoryCallback={newCategoryCallback}/> 
          ) : (
          <div /> 
        )
      }
      {!addCategory && !addItem ? (
        <button onClick={addItemView}>new Item</button>
      ):(
        <div />
      )
      }
      <h2>Categorries</h2>
      <div className="inventory-wrapper">
        <ul>
        { categories && categories.map(category =>
              <li key={category._id}>
                  <div> - category: {category.category} ----<button onClick={ () => {removeCategory(category.category);}}>removeMe</button></div>
              </li>
          )}
        </ul>
        {!addCategory && !addItem ? (
        <button onClick={ () => {newCategoryCallback();}}>new Category</button>
        ):(
          <div />
        )
        }
      </div>
      <Footer />
   </div> 
  );
}

export default InventoryPage;
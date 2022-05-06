import React, {useState, } from 'react';
import Select, { SingleValue } from "react-select";
import { Category } from '../pages/inventory';

type Props = {
  categories: Category[];  
  newItemCallback: (pname: string, pcategory: string) => void;
  newCategoryCallback: () => void;

};

interface SelectableCategory {
    value: string;
    label: string;
  }


const NewItemEditor: React.FunctionComponent<Props> = (props) => {
    //store information to state 
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    let options: SelectableCategory[] = [];

    //TODO: loop categories and add them into options
    for (let i of props.categories) {
      options.push({value:i.category, label:i.category} as SelectableCategory);    
    }

    options.push({value:"new", label:"new Category"} as SelectableCategory)
    
    const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {    
      setName( e.target.value );
    }

    const changeCategory = (newitem: SingleValue<SelectableCategory>) => {
      if(newitem!=null && newitem.value === "new"){
        props.newCategoryCallback();
      }
      else if(newitem!=null){
          setCategory(newitem.value);
      }
        
    };
    
    const createNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {    
      props.newItemCallback(name, category);
    }

    return (<div className="item">
    <label htmlFor="newitemname" className="labels">Item Name:</label>
    <input type="text" id="newname" name="newname" onChange={nameChanged} />
    <Select options={options} onChange={changeCategory} />
    <button className="item-ready-button" onClick={createNewItem} >Add Item</button>
  </div>);
};

export default NewItemEditor;
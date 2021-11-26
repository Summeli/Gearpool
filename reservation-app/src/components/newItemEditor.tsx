import React, {useState, } from 'react';
import Select, { SingleValue } from "react-select";

type Props = {
  categories: String[];  
  projectCallback: (pname: string, pcategory: string) => void;
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
    options.push({value:"kengät", label:"kengät"} as SelectableCategory);
    options.push({value:"hakut", label:"hakut"} as SelectableCategory);

    const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {    
      setName( e.target.value );
    }

    const changeCategory = (newitem: SingleValue<SelectableCategory>) => {
        if(newitem!=null){
            setCategory(newitem.value);
        }
        
      };
    
    const createNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {    
      props.projectCallback(name, category);
    }

    return (<div className="item">
    <label htmlFor="newitemname" className="labels">Item Name:</label>
    <input type="text" id="newname" name="newname" onChange={nameChanged} />
    <Select options={options} onChange={changeCategory} />
    <button className="item-ready-button" onClick={createNewItem} >Add Item</button>
  </div>);
};

export default NewItemEditor;
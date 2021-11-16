import React, {useState, } from 'react';

type Props = {
  projectCallback: (pname: string) => void;
};


const NewCategoryEditor: React.FunctionComponent<Props> = (props) => {
    //store information to state 
    const [name, setName] = useState("");


    const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {    
      setName( e.target.value );
    }

    const createNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {    
      props.projectCallback(name);
    }

    return (<div className="item">
    <label htmlFor="newcategoryname" className="labels">Category Name:</label>
    <input type="text" id="newcategoryname" name="newcategoryname" onChange={nameChanged} />
    <button className="item-ready-button" onClick={createNewItem} >Add Category</button>
  </div>);
};

export default NewCategoryEditor;
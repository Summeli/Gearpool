import React from 'react';
import Select, { SingleValue } from "react-select";

interface SelectableItem {
    name: string;
    type: string;
  }

  
  const myitems: SelectableItem[] = [
    {
        name: "hakut",
        type: "category",
    },
    {
      name: "Edenred pro",
      type: "hakut",
    },
    {
      name: "BD TOSI KOVA",
      type: "hakut",
    },

    {
      name: "Scarpa 40",
      type: "kengät",
    }
  ];

  
const InventorySelector: React.FunctionComponent = () => {

    //TODO: put selected into state
    let selected : SelectableItem | null = null;

    const handleChange = (newitem: SingleValue<SelectableItem>) => {
        console.log(newitem);

      };

    const isDisabled = (item:SelectableItem) :boolean => {
        if(item.type === "category"){
            return true;
        }else{
            return false
        }
    };
    
    return (<div className="inventoryselector">
      <Select<SelectableItem>
        value={selected}
        name="Select item"
        getOptionLabel={(item: SelectableItem) => item.name}
        getOptionValue={(item: SelectableItem) => item.type}
        isOptionDisabled={(item: SelectableItem) => {return isDisabled(item)}}
        options={myitems}
        isClearable={true}
        backspaceRemovesValue={true}
        onChange={handleChange}
      />
  </div>

    )};

export default InventorySelector;
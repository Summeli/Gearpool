import React from 'react';
import Select, { SingleValue } from "react-select";
import { SelectableItem, useReservationContext } from './reservationcontext';

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

    const { item, setItem } = useReservationContext();
    if (!item || !setItem ) return null;

    const handleChange = (newitem: SingleValue<SelectableItem>) => {
        console.log(newitem);
        if(newitem!=null){
            setItem(newitem);
        }
        
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
        value={item}
        name="Select item"
        getOptionLabel={(item: SelectableItem) => item.name}
        getOptionValue={(item: SelectableItem) => item.name}
        isOptionDisabled={(item: SelectableItem) => {return isDisabled(item)}}
        options={myitems}
        isClearable={true}
        backspaceRemovesValue={true}
        onChange={handleChange}
      />
  </div>

    )};

export default InventorySelector;
import React from 'react';
import Select, { SingleValue } from "react-select";
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { SelectableItem, useReservationContext } from './reservationcontext';

  const myitems: SelectableItem[] = [
    {
        name: "hakut",
        category: "category",
    },
    {
      name: "Edenred pro",
      category: "hakut",
    },
    {
      name: "BD TOSI KOVA",
      category: "hakut",
    },

    {
      name: "Scarpa 40",
      category: "kengät",
    }
  ];

  
const InventorySelector: React.FunctionComponent = () => {

    const { item, setItem } = useReservationContext();
    const { inventory } = useReservationContext();

    if (!item || !setItem ) return null;

    const handleChange = (newitem: SingleValue<SelectableItem>) => {
        if(newitem!=null){
            setItem(newitem);
        }
        
      };

    const isDisabled = (item:SelectableItem) :boolean => {
        if(item.category === "category"){
            return true;
        }else{
            return false
        }
    };

    const myFilterOption = (option: FilterOptionOption<SelectableItem>, inputValue: string) : boolean => {
        const item: SelectableItem = option.data;
        const input = inputValue.toLowerCase();
        if(item.category.toLowerCase().includes(input) || item.name.toLowerCase().includes(input)){
            return true;
        }
        return false;
      };


    
    return (<div className="inventoryselector">
      <Select<SelectableItem>
        value={item}
        name="Select item"
        getOptionLabel={(item: SelectableItem) => item.name}
        getOptionValue={(item: SelectableItem) => item.name}
        isOptionDisabled={(item: SelectableItem) => {return isDisabled(item)}}
        options={inventory}
        filterOption={myFilterOption}
        isClearable={true}
        backspaceRemovesValue={true}
        onChange={handleChange}
      />
  </div>

    )};

export default InventorySelector;
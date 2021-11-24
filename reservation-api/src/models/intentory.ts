import mongoose, { model, Schema, Model, Document } from 'mongoose';

export interface IInventory extends Document{
    name: String
    items: InventoryItem[];
}

export interface InventoryItem {
    name: String
    category: String
}

//subdocument schema
const InventoryItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: {type: String, required: true},
    }
);

const InventorySchema: Schema = new Schema({
    name: String,
    items: [InventoryItemSchema]
  });

export const Inventory: Model<IInventory> = model<IInventory>('inventory', InventorySchema);
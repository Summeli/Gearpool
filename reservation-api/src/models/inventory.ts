import mongoose, { model, Schema, Model, Document } from 'mongoose';

export interface IInventory extends Document{
    name: String
    category: String
}

const InventorySchema: Schema = new Schema({
    name: { type: String, required: true },
    category: {type: String, required: true},
  });

export const Inventory: Model<IInventory> = model<IInventory>('inventory', InventorySchema);
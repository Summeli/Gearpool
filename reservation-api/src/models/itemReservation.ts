import mongoose, { model, Schema, Model, Document } from 'mongoose';

export interface IItemReservation extends Document{
    itemId: String
    name: String
    month: number
    year: number
    reservations: Date[];
}

//subdocument schema
const ItemReservationSchema: Schema = new Schema({
    ItemId: { type: String, required: true },
    name: {type: String, required: true},
    month: {type: String, required: true},
    year: {type: String, required: true},
    reservations : [Date]
    }
);


export const Inventory: Model<IItemReservation> = model<IItemReservation>('reservation', ItemReservationSchema);
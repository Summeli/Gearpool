import { model, Schema, Model, Document } from 'mongoose';

export interface IItemReservation extends Document{
    itemId: String
    reservedBy: String
    month: number
    year: number
    date: number
}

//subdocument schema
const ItemReservationSchema: Schema = new Schema({
    ItemId: { type: String, required: true },
    reservedBy: {type: String, required: true},
    month: {type: Number, required: true},
    year: {type: Number, required: true},
    date : {type: Number, required: true},
    }
);


export const ItemReservation: Model<IItemReservation> = model<IItemReservation>('reservation', ItemReservationSchema);
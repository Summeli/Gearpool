import { model, Schema, Model, Document } from 'mongoose';

export interface ICategory extends Document{
    category: String
}

const CategorySchema: Schema = new Schema({
    category: {type: String, required: true}
});


export const Categories: Model<ICategory> = model<ICategory>('categories', CategorySchema);
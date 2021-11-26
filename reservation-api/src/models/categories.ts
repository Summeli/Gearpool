import { model, Schema, Model, Document } from 'mongoose';

export interface ICategory extends Document{
    name: String
    categories: String[];
}

const CategorySchema: Schema = new Schema({
    name: String,
    categories: [String]
  });


export const Categories: Model<ICategory> = model<ICategory>('categories', CategorySchema);
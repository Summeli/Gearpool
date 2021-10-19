import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document{
    user: string;
    userName : string;
    lastLogin : Date;
    isAdmin : boolean;
}

const UserSchema: Schema = new Schema({
    user: { type: String, required: true },
    userName: { type: String, required: true },
    lastLogin: {type: Date, required: false},
    isAdmin: {type: Boolean, default: false}
  });

export const User: Model<IUser> = model<IUser>('users', UserSchema);

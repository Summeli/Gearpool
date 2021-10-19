import { FilterQuery, UpdateQuery } from 'mongoose';
import { DEFAULT_ADMIN } from './env'
import { IUser, User } from '../models/user';

// middleware function to get UserObject for login
export const checkAdminAndUpdateUser =  async (puser: string, pusername : string) => {

    const filter = { user: puser } as FilterQuery<IUser>;
    const update = { lastLogin: new Date()} as UpdateQuery<IUser>;
    let luser : IUser | null = await User.findOneAndUpdate(filter, update,{new: false });

    if(!luser){
        //user not found, create new
        let admin : boolean = false;
        if(puser === DEFAULT_ADMIN){
            admin = true;
            console.log("Creating default admin for user: ", puser);
        }
        luser = await User.create({
            user: puser,
            userName: pusername,
            lastLogin: new Date(),
            isAdmin: admin,
          });
    }

    if(!luser){
        return false;
    }

    return luser.isAdmin;
};

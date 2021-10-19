import {Router, Request, Response} from "express";
import { verifyAdmin } from "../middleware/loginmiddleware";
import { IUser, User } from "../models/user";


const userpermissionsRouter = Router();


export interface UserPermissions {
    user: string,
    isAdmin: boolean
}

userpermissionsRouter.get("/",verifyAdmin, async (_req: Request, res: Response) => {
    const filter = {};
    let users : IUser[] | null = await User.find(filter);
    return res.status(200).send(users);

});

userpermissionsRouter.put("/",verifyAdmin, async (_req: Request, res: Response) => {
    const permissions: UserPermissions = JSON.parse(_req.body.userpermission);
    const filter = {user: permissions.user};
    const update = {isAdmin : permissions.isAdmin};
    let user : IUser | null = await User.findOneAndUpdate(filter, update,{new: false });
    
    if(!user){
        return res.status(404).send(); //user not found
    }
    //return list of current users
    let users : IUser[] | null = await User.find(filter);
    return res.status(200).send(users);

});

userpermissionsRouter.delete("/:user",verifyAdmin, async (_req: Request, res: Response) => {
    const puser : string = _req.params.user;
    const filter = {user: puser};
    await User.remove(filter);

    //return list of current users
    let users : IUser[] | null = await User.find(filter);
    return res.status(200).send(users);
});

export default userpermissionsRouter;


import express, {NextFunction, Request, Response} from "express";

//defining types that we can store into session
declare module "express-session" {
    interface Session {
      name: string;
      user: string;
      authenticated: boolean;
      admin: boolean;
    }
  }
  
// middleware function to check for logged-in users
export const verifyLogin = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.authenticated){
        return res.status(401).send();
      } else {
        next();
    }    
  };

// middleware function to check for admin
export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if(!req.session.admin){
      return res.status(401).send();
    } else {
      next();
  }    
};

// is request made with Admin
export function isAdmin(req: Request) : boolean {
  if(!req.session.admin){
      return false
    } else {
      return true;
  }    
};

  
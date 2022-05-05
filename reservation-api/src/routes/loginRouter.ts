import {Router, Request, Response} from "express";
import {LoginTicket, OAuth2Client} from "google-auth-library";
import { checkAdminAndUpdateUser } from "../middleware/userinfomiddleware";
import { G_AUTH_ID } from "../middleware/env";

const loginRouter = Router();

interface LoginResponse {
  username: string;
  isAdmin: boolean;
}
loginRouter.post("/", async(req: Request, res : Response) => {
    let username: string = "Anonymous";
    let mysession = req.session;
    if(mysession.user){
      console.log("we already had a user logged in, overwrite the session");
    }
    
    let mytoken: any = req.body.token_id;
    const client = new OAuth2Client(G_AUTH_ID);
    async function verify() {
        const ticket : LoginTicket = await client.verifyIdToken({
            idToken: mytoken,
            audience: G_AUTH_ID
        });
        const payload = ticket.getPayload();
        if(!payload){
        console.log("auth failed");
        return "ERROR";
        }
  
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        const domain = payload['hd'];
        username = payload['given_name'] + " " + payload['family_name'];
        const email = payload['email'];
        if(!email){
            return res.status(500).send("email not found from the google token");
        }
        mysession.user = payload['email'] ??  "";
        mysession.name = username;
        mysession.authenticated = true;

        //update login time and set
        mysession.admin  = await checkAdminAndUpdateUser(mysession.user, mysession.name);
        
        const ldata: LoginResponse = {username: username, isAdmin: mysession.admin}; 
        return res.status(200).send(ldata);
    }
    verify().catch(console.error);
  });

export default loginRouter;


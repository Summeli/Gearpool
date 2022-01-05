import {Router, Request, Response} from "express";
import { verifyLogin } from "../middleware/loginmiddleware";

const reservationsRouter = Router();

reservationsRouter.get("/",verifyLogin, async (_req: Request, res: Response) => {

    return res.status(200).send();
});


export default reservationsRouter;

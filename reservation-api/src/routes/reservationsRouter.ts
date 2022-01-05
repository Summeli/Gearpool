import {Router, Request, Response} from "express";
import { verifyAdmin,verifyLogin } from "../middleware/loginmiddleware";

const reservationsRouter = Router();


const inventoryName: string = "trad"

reservationsRouter.get("/",verifyLogin, async (_req: Request, res: Response) => {

    return res.status(200).send();
});

export default reservationsRouter;

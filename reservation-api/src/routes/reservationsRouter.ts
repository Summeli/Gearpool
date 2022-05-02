import {Router, Request, Response} from "express";
import { verifyLogin } from "../middleware/loginmiddleware";

const reservationsRouter = Router();

reservationsRouter.get("/:year/:month/:itemid/",verifyLogin, async (_req: Request, res: Response) => {

    return res.status(200).send();
});


reservationsRouter.post("/:year/:month/:date/",verifyLogin, async (_req: Request, res: Response) => {
    const pmonth : number = Number(_req.params.month);
    const pyear: number = Number(_req.params.year);
    const pdate: number = Number(_req.params.date);

    //read itemIUd from body
    console.log('Got body:', _req.body);

    return res.status(200).send();
});



export default reservationsRouter;

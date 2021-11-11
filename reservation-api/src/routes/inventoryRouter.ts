import {Router, Request, Response} from "express";
import { verifyAdmin,verifyLogin } from "../middleware/loginmiddleware";

const inventoryRouter = Router();

inventoryRouter.get("/",verifyLogin, async (_req: Request, res: Response) => {

    return res.status(200).send();
});


inventoryRouter.post("/",verifyAdmin, async (_req: Request, res: Response) => {
    //adds an intem into the inventory
    return res.status(200).send();
});

export default inventoryRouter;

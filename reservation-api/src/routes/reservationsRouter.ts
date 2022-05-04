import {Router, Request, Response} from "express";
import { PartiallyEmittedExpression } from "typescript";
import { verifyLogin } from "../middleware/loginmiddleware";
import {IItemReservation, ItemReservation} from '../models/ItemReservation';

//upsert option for montdb
const upsert =  {
    new: true,
    upsert: true // Make this update into an upsert
  }


const reservationsRouter = Router();

reservationsRouter.get("/:year/:month/",verifyLogin, async (_req: Request, res: Response) => {
    const pmonth : number = Number(_req.params.month);
    const pyear: number = Number(_req.params.year);
    const pItemId: String = String(JSON.parse(String(_req.query.id)));

    const findThisMonth =  {itemId: pItemId, year: pyear, month: pmonth};

    let reservations : IItemReservation[] | null = await ItemReservation.find(findThisMonth);
    return res.status(200).send(reservations);
});


reservationsRouter.post("/:year/:month/:date/",verifyLogin, async (_req: Request, res: Response) => {
    const mysession = _req.session;
    const pmonth : number = Number(_req.params.month);
    const pyear: number = Number(_req.params.year);
    const pdate: number = Number(_req.params.date);

    const pItemId: String = String(JSON.parse(String(_req.query.id)));

    const filter = {itemId: pItemId, yaer: pyear, month: pmonth, date: pdate };
    
    //verify that item is available
    let reserved : IItemReservation | null = await ItemReservation.findOne(filter);
    if(reserved === null){
        //it's free, reserve it
        console.log("params, pmonth", pmonth, "pyear", pyear, "pdate", pdate, "itemId", pItemId);
        const newReservation = {itemId: pItemId, reservedBy: mysession.user, year: pyear, month: pmonth, date: pdate };
        ItemReservation.create(newReservation);
    }

   

    const findThisMonth =  {itemId: pItemId, yaer: pyear, month: pmonth };
    let reservations : IItemReservation[] | null = await ItemReservation.find(findThisMonth);

    return res.status(200).send(reservations);
});




export default reservationsRouter;

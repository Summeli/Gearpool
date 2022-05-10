import {Router, Request, Response} from "express";
import { isAdmin, verifyAdmin, verifyLogin } from "../middleware/loginmiddleware";
import {IItemReservation, ItemReservation} from "../models/itemReservation";

//upsert option for montdb
const upsert =  {
    new: true,
    upsert: true // Make this update into an upsert
  }


const reservationsRouter = Router();

reservationsRouter.get("/:year/:month/",verifyLogin, async (_req: Request, res: Response) => {
    const mysession = _req.session;

    const pmonth : number = Number(_req.params.month);
    const pyear: number = Number(_req.params.year);
    const pItemId: String = String(JSON.parse(String(_req.query.id)));

    const findThisMonth =  {itemId: pItemId, year: pyear, month: pmonth};

    let reservations : IItemReservation[] | null = await ItemReservation.find(findThisMonth);

    hideEmails(mysession.user, isAdmin(_req), reservations,);

    return res.status(200).send(reservations);
});


reservationsRouter.post("/:year/:month/:date/",verifyLogin, async (_req: Request, res: Response) => {
    const mysession = _req.session;
    const pmonth : number = Number(_req.params.month);
    const pyear: number = Number(_req.params.year);
    const pdate: number = Number(_req.params.date);

    const pItemId: String = String(JSON.parse(String(_req.query.id)));

    const filter =  {itemId: pItemId, year: pyear, month: pmonth, date: pdate};
    
    //verify that item is available
    let reserved : IItemReservation | null = await ItemReservation.findOne(filter);
    if(reserved === null){
        //it's free, reserve it
        const newReservation = {itemId: pItemId, reservedBy: mysession.user, year: pyear, month: pmonth, date: pdate };
        await ItemReservation.create(newReservation);
    }else {
        if(reserved.reservedBy === mysession.user){
            await ItemReservation.findOneAndDelete({_id:reserved._id});
        }
    }

    //return new state
    const findThisMonth =  {itemId: pItemId, year: pyear, month: pmonth};
    let reservations : IItemReservation[] | null = await ItemReservation.find(findThisMonth);
    
  
    hideEmails(mysession.user, isAdmin(_req), reservations,);

    return res.status(200).send(reservations);
});


//admin mode only: removes a reservation
reservationsRouter.delete("/:year/:month/:date/",verifyAdmin, async (_req: Request, res: Response) => {
    const mysession = _req.session;
    const pmonth : number = Number(_req.params.month);
    const pyear: number = Number(_req.params.year);
    const pdate: number = Number(_req.params.date);

    const pItemId: String = String(JSON.parse(String(_req.query.id)));

    const filter =  {itemId: pItemId, year: pyear, month: pmonth, date: pdate};
    
    //verify that item is available
    let reserved : IItemReservation | null = await ItemReservation.findOne(filter);
    if(reserved !== null){
        //found, remove it
        await ItemReservation.findOneAndDelete({_id:reserved._id});

    }
    //return new state
    const findThisMonth =  {itemId: pItemId, year: pyear, month: pmonth};
    let reservations : IItemReservation[] | null = await ItemReservation.find(findThisMonth);
    
  
    hideEmails(mysession.user, isAdmin(_req), reservations,);

    return res.status(200).send(reservations);
});


function hideEmails(user: string, isadmin: boolean, items: IItemReservation[] ){
    for( var item of items){
        if(item.reservedBy === user){
            item.reservedBy = "me";
        }else {
            if(isadmin === false){ //hide emails, if not admin
                item.reservedBy = "oks";
            }
        }
    }
}

export default reservationsRouter;

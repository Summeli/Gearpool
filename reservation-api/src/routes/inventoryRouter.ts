import {Router, Request, Response} from "express";
import { verifyAdmin,verifyLogin } from "../middleware/loginmiddleware";
import {IInventory, Inventory, InventoryItem} from "../models/intentory"

const inventoryRouter = Router();

//upsert option for montdb
const upsert =  {
    new: true,
    upsert: true // Make this update into an upsert
  }

const inventoryName: string = "trad"

inventoryRouter.get("/",verifyLogin, async (_req: Request, res: Response) => {
    let inventory : IInventory | null = await Inventory.findOne({ name: inventoryName});

    return res.status(200).send(inventory);
});


inventoryRouter.post("/",verifyAdmin, async (_req: Request, res: Response) => {
    console.log(_req.body);
    const newInventory: InventoryItem[] = _req.body.newItems;
    const filter = { name: inventoryName };
    await Inventory.findOneAndReplace(filter,{
        name: inventoryName,
        items: newInventory
    },upsert);

    //item added, return 200
    return res.status(200).send();
});

export default inventoryRouter;

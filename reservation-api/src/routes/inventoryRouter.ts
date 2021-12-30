import {Router, Request, Response} from "express";
import { verifyAdmin,verifyLogin } from "../middleware/loginmiddleware";
import {IInventory, Inventory, InventoryItem} from "../models/intentory"
import {Categories, ICategory} from "../models/categories"

const inventoryRouter = Router();

//upsert option for montdb
const upsert =  {
    new: true,
    upsert: true // Make this update into an upsert
  }

const inventoryName: string = "trad"

inventoryRouter.get("/",verifyLogin, async (_req: Request, res: Response) => {
    let response : InventoryItem[] = new Array<InventoryItem>();
    let inventory : IInventory | null = await Inventory.findOne({ name: inventoryName});
    if(inventory && inventory.items){
      response = inventory.items;
    }
    return res.status(200).send(response);
});


inventoryRouter.post("/",verifyAdmin, async (_req: Request, res: Response) => {
    const newInventory: InventoryItem[] = _req.body.newItems;
    const filter = { name: inventoryName };
    await Inventory.findOneAndUpdate(filter,{
        name: inventoryName,
        items: newInventory
    },upsert);

    //item added, return 200
    return res.status(200).send();
});


inventoryRouter.get("/categories",verifyLogin, async (_req: Request, res: Response) => {
    let response : String[] = new Array<String>();
    let categories : ICategory | null = await Categories.findOne({ name: inventoryName});
    if(categories && categories.categories){
      response = categories.categories;
    }
    return res.status(200).send(response);
});


inventoryRouter.post("/categories",verifyAdmin, async (_req: Request, res: Response) => {
    const newCategories: String[] = _req.body.newCategories;
    const filter = { name: inventoryName };
    await Categories.findOneAndUpdate(filter,{
        name: inventoryName,
        categories: newCategories
    },upsert);

    //item added, return 200
    return res.status(200).send();
});

export default inventoryRouter;

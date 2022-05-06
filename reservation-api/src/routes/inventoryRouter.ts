import {Router, Request, Response} from "express";
import { verifyAdmin,verifyLogin } from "../middleware/loginmiddleware";
import {IInventory, Inventory} from "../models/inventory"
import {Categories, ICategory} from "../models/categories"

const inventoryRouter = Router();

//upsert option for montdb
const upsert =  {
    new: true,
    upsert: true // Make this update into an upsert
  }

const inventoryName: string = "trad"


inventoryRouter.get("/",verifyLogin, async (_req: Request, res: Response) => {
    let inventory : IInventory[] | null = await Inventory.find();

    return res.status(200).send(inventory);
});


inventoryRouter.post("/",verifyAdmin, async (_req: Request, res: Response) => {
    const newItem: IInventory = _req.body;
    let filter = {name: newItem.name, category: newItem.category}
    //verify that it's not  a duplicate
    let reserved : IInventory | null = await Inventory.findOne(filter);
    if(reserved === null){
        //it's free, reserve it
        const item = {name: newItem.name, category: newItem.category };
        await Inventory.create(item);
        console.log("item added to inventory:" + newItem.name + "category: "+ newItem.category);
    }

    //item added, return 200
    return res.status(200).send();
});

inventoryRouter.delete("/:name",verifyAdmin, async (_req: Request, res: Response) => {
    const pname : string = String(_req.params.name);
    console.log("dete item:"+ pname);
    const filter =  {name: pname};
    
    //verify that item is available
    let reserved : IInventory | null = await Inventory.findOne(filter);
    if(reserved !== null){
        console.log("found, delete item: "+ pname);
        await Inventory.findOneAndDelete(filter);
    }else {
        console.log("unable to delete item, not found:", pname);
    }    

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

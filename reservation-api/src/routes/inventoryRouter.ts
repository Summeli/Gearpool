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

    //send new state
    let inventory : IInventory[] | null = await Inventory.find();
    return res.status(200).send(inventory);
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

    //send new state
    let inventory : IInventory[] | null = await Inventory.find();
    return res.status(200).send(inventory);
});


inventoryRouter.get("/categories",verifyLogin, async (_req: Request, res: Response) => {
    let categories : ICategory[] | null = await Categories.find();

    return res.status(200).send(categories);
});


inventoryRouter.post("/categories/:name",verifyAdmin, async (_req: Request, res: Response) => {
    const newCategory : string = String(_req.params.name);

    const filter =  {category: newCategory};
    //verify that it's not  a duplicate
    let reserved : ICategory | null = await Categories.findOne(filter);
    if(reserved === null){
        //it's free, reserve it
        const item = {category: newCategory };
        await Categories.create(item);
        console.log("new Category added to inventory:" + newCategory);
    }

    let categories : ICategory[] | null = await Categories.find();

    return res.status(200).send(categories);
});

inventoryRouter.delete("/categories/:name",verifyAdmin, async (_req: Request, res: Response) => {
    const newCategory : string = String(_req.params.name);

    const filter =  {category: newCategory};
    //verify that it's not  a duplicate
    let reserved : ICategory | null = await Categories.findOne(filter);
    if(reserved !== null){
        //found, delete it
        const item = {category: newCategory };
        await Categories.findOneAndDelete(item);
        console.log("categoruy deleted" + newCategory);
    }

    let categories : ICategory[] | null = await Categories.find();
    return res.status(200).send(categories);
});



export default inventoryRouter;

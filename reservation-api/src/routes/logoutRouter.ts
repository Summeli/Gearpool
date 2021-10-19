import {Router, Request, Response} from "express";

const logoutRouter = Router();

logoutRouter.post("/", async(req: Request, res : Response) => {
    req.session.destroy(data => {});
    res.clearCookie('trad-reservation') // clean up!
    return res.status(200).send();

});

export default logoutRouter;
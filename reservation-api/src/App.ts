import express, { Application, json, Router, Request, Response} from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import "colors";
import { config } from "dotenv";
import { verifyLogin } from "./middleware/loginmiddleware"
import loginRouter from "./routes/loginRouter"
import mongoose from 'mongoose'
import userpermissionsRouter from "./routes/userpermissionsRouter";
import logoutRouter from "./routes/logoutRouter";
import inventoryRouter from "./routes/inventoryRouter"
import reservationsRouter from "./routes/reservationsRouter"
import {MONGO_URL, ENV, PORT, REACT_APP_SHOW_BUILD} from "./middleware/env"
config();
const app: Application = express();
app.use(express.static('public'))

app.use(json());

console.log("MONGO URL is: ", MONGO_URL);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_URL, {useNewUrlParser: true});

const MemoryStore = createMemoryStore(session);

app.use(session({
  name: "trad-reservation",
  secret: process.env.SESSION_SECRET ?? "CHANGE_ME",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, //TODO: make sure cookie is set into secure in the cloud level
    sameSite: true,
    maxAge: 60*60*1000, // 1 hour
}, store: new MemoryStore({
  checkPeriod: 86400000 // prune expired entries every 24h
  })
}));

if(process.env.NODE_ENV === 'development'){
  app.use(function(req, res, next) {
      console.log("alow cors in DEV");
      res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
}


const routes = Router();
routes.use('/api/login', loginRouter);
routes.use('/api/logout', logoutRouter);
routes.use('/api/userpermissions', userpermissionsRouter);
routes.use('/api/inventory', inventoryRouter);
routes.use('/api/reservations', reservationsRouter);

app.use(routes);

app.get("/api/", (_req: Request, res: Response) => {
  return res.send("API RUNNING in "+ ENV + " mode");
});

app.get("/api/user", verifyLogin, (_req: Request, res: Response) => {
  return res.status(200).send(_req.session.name);
});

app.get("/api/showbuild", (_req: Request, res: Response) => {
  return res.send(REACT_APP_SHOW_BUILD);
});

app.listen(PORT, () =>
  console.log(
    ` 📡 Backend server: `.inverse.yellow.bold +
      ` Running in ${ENV} mode on port ${PORT}`
  )
);
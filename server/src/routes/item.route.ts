import { Router } from "express";
import {
   createItemHandler,
   deleteItemsHandler,
   sendItemHandler,
   sendLatestItemsHandler,
} from "../controllers/item.controller";
import requireUser from "../middleware/requireUser";

const itemRouter = Router();

itemRouter.post("/new", requireUser, createItemHandler);
itemRouter.post("/delete", requireUser, deleteItemsHandler);
itemRouter.get("/get/:id", sendItemHandler);
itemRouter.get("/:number", sendLatestItemsHandler);

export default itemRouter;

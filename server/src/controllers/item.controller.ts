import { Request, Response } from "express";
import { ICreateItem } from "../models/item.model";

import { createItem } from "../services/item.service";

export const createItemHandler = async (req:Request<{},{}, ICreateItem>, res:Response) => {
   console.log("hit", req.body)
   try {
      const item = await createItem(req.body)
      res.json({item})
   } catch (error) {
      res.sendStatus(404)
   }
}


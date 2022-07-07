import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { ICreateItem } from "../models/item.model";

import { createItem, deleteItems } from "../services/item.service";
import { SuccessMessage, ErrorMessage } from "../config/constants.config";

export const createItemHandler = async (req:Request<{},{}, ICreateItem[]>, res:Response) => {
   try {
      const item = await createItem(req.body)
      console.log("item", item)
      res.json({item})
   } catch (error) {
      res.sendStatus(409)
   }
}

export const deleteItemsHandler = async (req:Request<{},{},ObjectId>, res:Response) => {
   try {
      await deleteItems(req.body)
      res.send({message: SuccessMessage.ITEM_DELETED})
   } catch (error) {
      res.status(404).send({message: ErrorMessage.USER_DELETION_FAILURE})
   }
}


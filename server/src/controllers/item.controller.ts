import { Request, Response } from "express";
import mongoose,{ Types} from "mongoose";
import { ObjectId } from "mongoose";
import { ICreateItem } from "../models/item.model";

import { createItem, deleteItems, findItem } from "../services/item.service";
import { SuccessMessage, ErrorMessage } from "../config/constants.config";

export const createItemHandler = async (req:Request<{},{}, ICreateItem[]>, res:Response) => {
   try {
      console.log(req.body)
      const item = await createItem(req.body)
      res.json({item})
   } catch (error) {
      res.sendStatus(409)
   }
}

export const deleteItemsHandler = async (req:Request, res:Response) => {
   try {
      await deleteItems(req.body)
      res.send({message: SuccessMessage.ITEM_DELETED})
   } catch (error) {
      res.status(404).send({message: ErrorMessage.USER_DELETION_FAILURE})
   }
}

export const sendItemHandler = async (req: Request<{id: string}>, res: Response) => {
   const params = req.params.id
   try {
      const item = await findItem(params)
      if(!item) throw new Error()
      res.json(item)
   } catch (error) {
      res.status(404).send({message: ErrorMessage.GET_ITEM_FAILURE})
   }
}

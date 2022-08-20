import { Request, Response } from "express";
import { ICreateItem, IItemDocument } from "../models/item.model";

import {
   createItem,
   deleteItems,
   findItem,
   findLatestItems,
   assignCollectionNameToItem,
} from "../services/item.service";
import { SuccessMessage, ErrorMessage } from "../config/constants.config";
import { authorize } from "../services/user.service";
import getErrorMessage from "../utils/getErrorMessage";

interface ItemInput extends Omit<IItemDocument, "_id" | "collectionId"> {
   _id: string;
   collectionId: string;
}

export const createItemHandler = async (
   req: Request<{}, {}, ICreateItem[]>,
   res: Response
) => {
   try {
      const item = await createItem(req.body);
      res.json(item);
   } catch (error) {
      res.sendStatus(404);
   }
};

export const deleteItemsHandler = async (
   req: Request<{}, {}, ItemInput[]>,
   res: Response
) => {
   const user = res.locals.user;
   const collectionId = req.body[0].collectionId;

   try {
      await authorize(collectionId, user);
      await deleteItems(req.body);
      res.send({ message: SuccessMessage.ITEM_DELETED });
   } catch (error) {
      if (getErrorMessage(error) === ErrorMessage.NOT_AUTHORIZED) {
         res.status(401).send({ message: getErrorMessage(error) });
      } else {
         res.status(404).send({ message: ErrorMessage.USER_DELETION_FAILURE });
      }
   }
};

export const sendItemHandler = async (req: Request<{ id: string }>, res: Response) => {
   const params = req.params?.id;

   try {
      const item = await findItem(params);
      if (!item) throw new Error();
      res.send(item);
   } catch (error) {
      res.status(404).send({ message: ErrorMessage.GET_ITEM_FAILURE });
   }
};

export const sendLatestItemsHandler = async (req: Request, res: Response) => {
   const amount = req.params?.number;
   try {
      const items = await findLatestItems(Number(amount));
      const modifiedItems = await assignCollectionNameToItem(items);
      res.send(modifiedItems);
   } catch (error) {
      res.status(404).send({ message: ErrorMessage.GET_ITEM_FAILURE });
   }
};

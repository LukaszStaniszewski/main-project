import { Request, Response } from "express";
import logger from "../utils/logger";

import {
   createCollectionWithItems,
   ICollectionWithItems,
   findItems,
   autoCompleteItem,
   autoCompleteCollection,
   findCollection,
   autoCompleteUser,
} from "../services";
import getErrorMessage from "../utils/getErrorMessage";
import { ErrorMessage } from "../config/constants.config";

export const createCollectionWithItemsHandler = async (
   req: Request<{}, {}, ICollectionWithItems>,
   res: Response
) => {
   try {
      const collectionId = await createCollectionWithItems(req.body);
      res.send({ collectionId: collectionId });
   } catch (error) {
      if (getErrorMessage(error) === ErrorMessage.COLLECTION_NOT_CREATED) {
         res.status(409).send({ message: getErrorMessage(error) });
      } else if (getErrorMessage(error) === ErrorMessage.ITEM_NOT_CREATED) {
         res.status(409).send({ message: getErrorMessage(error) });
      }
      logger.error(getErrorMessage(error));
   }
};

export const getCollectionWithItemsById = async (req: Request, res: Response) => {
   const params = req.params.id;
   try {
      const collection = await findCollection(params);
      const items = await findItems(collection);
      const itemWithCollections = { ...collection, items: items };
      if (!itemWithCollections || !itemWithCollections.items) throw new Error();
      res.json(itemWithCollections);
   } catch (error) {
      res.sendStatus(404);
   }
};

export const autoCompleteHandler = async (req: Request, res: Response) => {
   try {
      const collection = await autoCompleteCollection(req.body.query);
      const item = await autoCompleteItem(req.body.query);
      const user = await autoCompleteUser(req.body.query);

      res.json([...item, ...collection, ...user]);
   } catch (error) {
      res.status(404);
   }
};

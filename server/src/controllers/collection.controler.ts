import { Request, Response } from "express";

import { ICreateItemCollection } from "../models/collection.model";
import {
   findCollectionsByUser,
   createCollection,
   deleteCollection,
   findLargestCollections,
} from "../services/collection.service";
import {
   ErrorMessage,
   SuccessMessage,
   collectionTopics,
} from "../config/constants.config";
import { uploadImage } from "../utils/imageKit.utils";
import { authorize } from "../services/user.service";
import getErrorMessage from "../utils/getErrorMessage";

export const createCollectionHandler = async (
   req: Request<{}, {}, ICreateItemCollection>,
   res: Response
) => {
   try {
      const isTopicExisting = collectionTopics.find((topic) => topic === req.body.topic);
      if (!isTopicExisting)
         return res.status(401).send({ message: ErrorMessage.COLLECTION_TOPIC_ERROR });

      const colletion = await createCollection(req.body);
      return res.json({ colletion });
   } catch (error) {
      res.sendStatus(400).send(error);
   }
};

export const uploadImageHandler = async (req: Request, res: Response) => {
   const uploadedImage = req.file?.buffer;
   const collectionId = "cos";
   if (!uploadedImage) return;
   try {
      const image = await uploadImage(uploadedImage, collectionId);
      res.status(200).json({ image });
   } catch {
      res.sendStatus(400);
   }
};

export const getCollectionsPinnedToUser = async (req: Request, res: Response) => {
   const params = req.params.name;
   try {
      const collections = await findCollectionsByUser(params);
      res.json(collections);
   } catch (error) {
      if (getErrorMessage(error) === ErrorMessage.USER_NOT_FOUND) {
         res.status(409).send({ message: ErrorMessage.USER_NOT_FOUND });
      } else if (getErrorMessage(error) === ErrorMessage.USER_HAS_NO_COLLECTIONS) {
         res.status(403).send({ message: ErrorMessage.USER_HAS_NO_COLLECTIONS });
      } else {
         res.sendStatus(400);
      }
   }
};

export const getLargestCollections = async (req: Request, res: Response) => {
   const amount = req.params.number;
   try {
      const collections = await findLargestCollections(Number(amount));
      res.json(collections);
   } catch (error) {
      res.sendStatus(405);
   }
};

export const deleteCollectionHandler = async (req: Request, res: Response) => {
   const params = req.params.id;
   const user = res.locals.user;
   try {
      await authorize(params, user);
      await deleteCollection(params);
      res.send({ message: SuccessMessage.COLLECTION_DELETED });
   } catch (error) {
      res.status(401).send({ message: ErrorMessage.NOT_AUTHORIZED });
   }
};

import { Request, Response } from "express";

import { ICreateItemCollection } from "../models/collection.model";
import {
   findCollectionsByUser,
   findAllCollections,
   createCollection,
   deleteCollection,
   findCollection,
   findLargestCollections,
} from "../services/collection.service";
import {
   ErrorMessage,
   SuccessMessage,
   collectionTopics,
} from "../config/constants.config";
import { uploadImage } from "../utils/imageKit.utils";

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
      res.sendStatus(400);
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
      //@ts-ignore
      if (error.message === "User not found") {
         res.sendStatus(409);
      } else {
         res.sendStatus(403);
      }
   }
};

export const getAllCollections = async (req: Request, res: Response) => {
   try {
      const collections = await findAllCollections();
      res.json({ collections });
   } catch (error) {
      res.sendStatus(405);
   }
};

export const getLargestCollections = async (req: Request, res: Response) => {
   console.log("hit");
   const amount = req.params.number;
   try {
      const collections = await findLargestCollections(Number(amount));
      res.json(collections);
   } catch (error) {
      res.sendStatus(405);
   }
};

// export const deleteCollectionsHandler = async (req:Request, res:Response) => {
//    const param = req.params._id
//    const user = res.locals.user
//    if(param !== user.userId || user.role !== "admin") return res.status(401).send({message: ErrorMessage.NOT_AUTHORIZED})
//    try {
//       const collection = deleteCollections({_id: param})
//       res.send({message: SuccessMessage.COLLECTION_DELETED})
//    } catch (error) {
//       res.status(401).send({message: ErrorMessage.NOT_AUTHORIZED})
//    }
// }

export const deleteCollectionHandler = async (req: Request, res: Response) => {
   const params = req.params.id;
   const user = res.locals.user;
   const { owner } = await findCollection(params);
   if (owner.name !== user.name || user.role !== "admin")
      return res.status(401).send({ message: ErrorMessage.NOT_AUTHORIZED });
   try {
      const respsonse = await deleteCollection(params);
      res.send({ message: SuccessMessage.COLLECTION_DELETED });
   } catch (error) {
      res.status(401).send({ message: ErrorMessage.NOT_AUTHORIZED });
   }
};

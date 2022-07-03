import { Schema, model, Types } from "mongoose";
import dayjs from "dayjs";

import { IUserDocument } from "./user.model";
import { IItemDocument } from "./item.model";
import { CollectionTopics } from "../config/constants.config";

export interface IAppendItemsToCollections extends ICreateItemCollection {
   items?: IItemDocument[]
}


export interface ICreateItemCollection {
   name: string,
   topic: CollectionTopics,
   description: string,
   owner: {
      _id: IUserDocument["_id"],
      name: IUserDocument["name"]
   },
   image?: File
}

export interface IItemCollectionDocument extends ICreateItemCollection {
   _id: Types.ObjectId,
   createdAt: string,
   updatedAt: string,
   
}

const userCollectionSchema = new Schema<IItemCollectionDocument>({
   name: {
      type: String,
      required: true
   },
   topic: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   image: {
      data: Buffer,
      contentType: String
   },
   // image: String,
   owner: {
      _id: {
         type: Schema.Types.ObjectId,
         ref: "User",
         // required: true
      },
      name: {
         type: Schema.Types.String,
         ref: "User",
         // required: true
      },
   },
   createdAt: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm:ss"),
      immutable: true
   },
   updatedAt: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm:ss"),
   },
})

const UserCollectionModel = model<IItemCollectionDocument>("Collection", userCollectionSchema)
export default UserCollectionModel
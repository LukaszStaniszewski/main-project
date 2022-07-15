import { Schema, model, Types} from "mongoose";
import dayjs from "dayjs";

import {IItemCollectionDocument} from "./collection.model"
import { ICollectionWithItems } from "../services/collection&Items.service";
import { IUserDocument } from "./user.model";

export interface ICreateItem {
   id: string,
   name: string,
   tags: string[],
   collectionId: IItemCollectionDocument["_id"],
   topic: IItemCollectionDocument["topic"],
   optionalFields?: OptionalFields  
}

export interface IItemDocument extends ICreateItem {
   _id: Types.ObjectId,
   createdAt: string,
   updatedAt: string,
}

export interface ILatestItems {
  _id: Types.ObjectId,
  name: string,
  tags: string[],
  collectionId: IItemCollectionDocument["_id"],
  topic: IItemCollectionDocument["topic"],
  createdAt: string,
  collection?: ICollectionWithItems["name"],
  owner?: IUserDocument["name"]
 
}


type OptionalFields = {[key:string]: string | number | Date}

const optionalField= new Schema({}, {strict: false, _id:false})

const itemSchema = new Schema<IItemDocument>({
   id: {
      type: String,
      required: true, 
      unique: true,
   },
   name: {
      type: String,
      required: [true, "name is required"]
   },
   tags: [{
      type: String,
      required: [true, "tags are required"]
   }],
   collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: [true, "itemCollection is required"]
   },
   topic: {
      type: Schema.Types.String,
      ref: "Collection",
      required: [true, "topic is required"]
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
   optionalFields:{  
      type: Object,
      of: optionalField
   },
})

const ItemModel = model<IItemDocument>("Item", itemSchema);
export default ItemModel
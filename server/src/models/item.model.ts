import { Schema, model } from "mongoose";
import dayjs from "dayjs";

import {IItemCollectionDocument} from "./collection.model"

export interface ICreateItem {
   id: string,
   name: string,
   tags: string[],
   collectionId: IItemCollectionDocument["_id"],
   topic: IItemCollectionDocument["topic"],
   optionalFields?: OptionalFields  
}

export interface IItemDocument extends ICreateItem {
   createdAt: string,
   updatedAt: string,
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
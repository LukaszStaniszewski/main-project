import { Schema, model } from "mongoose";
import dayjs from "dayjs";

import {IItemCollectionDocument} from "./collection.model"
import { CollectionTopics } from "../config/constants.config";



export interface ICreateItem {
   name: string,
   tags: string[],
   itemCollection: IItemCollectionDocument["_id"],
   optionalFields?: IOptionalFields  
}

export interface IItemDocument extends ICreateItem {
   createdAt: string,
   updatedAt: string,
}

interface IOptionalFields {
   books: {[key:string]: any},
   clothes: {[key:string]: any},
   music: {[key:string]: any},
   movies: {[key:string]: any},
   painting: {[key:string]: any},
   sculpture:{[key:string]: any},
   banknot:{[key:string]: any},
   postard:{[key:string]: any},
}

const booksSchema = new Schema({}, {strict: false, _id:false})
const clothesSchema = new Schema({}, {strict: false, _id:false})
const musicSchema = new Schema({}, {strict: false, _id:false})
const moviesSchema = new Schema({}, {strict: false,  _id:false})
const paintingSchema = new Schema({}, {strict: false, _id:false})
const sculptureSchema = new Schema({}, {strict: false, _id:false})
const bankotSchema = new Schema({}, {strict: false, _id:false})
const postardSchema = new Schema({}, {strict: false, _id:false})


const optionalFieldsByTopicSchema = new Schema<IOptionalFields>({
   books: booksSchema,
      // author: String,
      // description: String,
      // language: String,
      // translations: String,
      // pages: Number,
      // salePrice: Number,
      // "Publication date of first edition": Date,
      // "Publication date": Date,
      // "Purchase date": Date,
      //  isDamaged: Boolean,
      //  "First owner": Boolean,
      //  "Limited edition": Boolean,
      //  image: String,
      //  notes: String,
  
   clothes: clothesSchema,

  
   music: musicSchema,

  
   movies: moviesSchema,

 
   painting: paintingSchema,


   sculpture: sculptureSchema,

 
   banknot: bankotSchema,


   postard: postardSchema,

   
}, {_id:false})

const itemSchema = new Schema<IItemDocument>({
   name: {
      type: String,
      required: true,
   },
   tags: [{
      type: String,
      required: true
   }],
      itemCollection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
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
   optionalFields: optionalFieldsByTopicSchema
})

const ItemModel = model<IItemDocument>("Item", itemSchema);
export default ItemModel
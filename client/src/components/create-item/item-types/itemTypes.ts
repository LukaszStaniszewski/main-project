import { Topics } from "../../../routes/create-collection/MOCKUP_DATA"

export const COLLECTIONS_MOCKUP = {
   books: {
      author: "",
      langauge: "",
      translation: "",
      description: "",
      pages: 1,
      SalePrice: 1,
     "Publication date of first edition": Date,
     "Publication date": Date,
     "Purchase date": Date,
      isDamaged: false,
      "First owner": false,
      "Limited edition": false,
      image: "",
      notes: "",
   },
   postard: {
      author: "",
   },
   painting: {
      author: "",
   },
   sculpture: {
      author: "",
   },
   banknot: {
      author: "",
   },
   clothing: {
      author: "",
   },
   music: {
      author: "",
   },
   movies: {
      author: "",
   },

} 

type typeOfCollections = typeof COLLECTIONS_MOCKUP

export interface ICollectionTopics extends typeOfCollections {}


export type ItemKey = keyof ICollectionTopics[keyof ICollectionTopics]

export type OptionalItemData = ICollectionTopics[CollectionTopic]


export type CollectionTopic = keyof ICollectionTopics

export interface IOptionalField {
   fieldName: ItemKey,
   valueType: string | number | boolean | Date,
   isAdded?: boolean 
}

export interface ICreateItem{
   id: string,
   name: string,
   tags: string[],
   topic: string
   optional?: OptionalItemData
}

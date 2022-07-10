export const Topics = ["books", "vehicle", "painting", "sculpture", "banknot", "clothing", "music", "movies"] as const


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
   vehicle: {
      model: "",
      type: "",
      color: "",
      "Production Date": Date,
      "Purchase date": Date,
      manufacturer: "",
      firstOwner: false,
      "Current Price": 1,
      fuelType: ""
   },
   painting: {
      author: "",
      description: "",
      image: "",
      isDamaged: false,
      notes: "",
      "First Owner": false,
      "Creation Data": Date,
      "Purchase date": Date,

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
      genre: "",
      name: "",
      album: "",
      "Creation Date": Date
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
   collectionId?: string,
   topic: string
   optionalFields?: OptionalItemData
}

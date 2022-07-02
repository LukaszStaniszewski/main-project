export const Topics = ["books", "postard", "painting", "sculpture", "banknot", "clothing", "music", "movies"] as const

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


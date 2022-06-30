export const Topics = ["Books", "Postard", "Painting", "Sculpture", "Banknot", "Clothing/Dress/Costume", "Music", "Movies"] as const

export const COLLECTIONS_MOCKUP = {
   Books: {
      author: "",
      langauge: "",
      translation: "",
      description: "",
      pages: 1,
      SalePrice: 1,
     "Publication date of first edition": new Date(),
     "Publication date": new Date(),
     "Purchase date": new Date(),
      isDamaged: false,
      "First owner": false,
      "Limited edition": false,
      image: "",
      notes: "",
   },
   Postard: {
      author: "",
   },
   Painting: {
      author: "",
   },
   Sculpture: {
      author: "",
   },
   Banknot: {
      author: "",
   },
   "Clothing/Dress/Costume": {
      author: "",
   },
   Music: {
      author: "",
   },
   Movies: {
      author: "",
   },

} 

type typeOfCollections = typeof COLLECTIONS_MOCKUP

export interface ICollectionTopics extends typeOfCollections {}


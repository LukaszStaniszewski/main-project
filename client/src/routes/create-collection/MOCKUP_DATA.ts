export const Topics = ["Books", "Postard", "Painting", "Sculpture", "Banknot", "Clothing/Dress/Costume", "Music", "Movies"] as const

export const COLLECTIONS_MOCKUP = {
   Books: {
      author: "",
      langauge: "",
      translation: "",
      description: "",
      pages: 1,
      publishDate: new Date(),
      SalePrice: 1,
      DateItemWasSold: new Date(),
      isDamaged: false,
      firsOwner: false,
      notes: ""
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


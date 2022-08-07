export const topics = [
   "books",
   "vehicle",
   "painting",
   "sculpture",
   "banknot",
   "clothing",
   "music",
   "movies",
] as const;

export const COLLECTIONS_MOCKUP = {
   books: {
      author: "",
      language: "",
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
   vehicle: {
      model: "",
      type: "",
      color: "",
      "Production Date": new Date(),
      "Purchase date": new Date(),
      manufacturer: "",
      firstOwner: false,
      "Current Price": 1,
      fuelType: "",
   },
   painting: {
      author: "",
      description: "",
      image: "",
      isDamaged: false,
      notes: "",
      "First Owner": false,
      "Creation Data": new Date(),
      "Purchase date": new Date(),
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
      "Creation Date": new Date(),
   },
   movies: {
      author: "",
   },
};

export interface IOptionalFields {
   books: {
      author?: string;
      language?: string;
      translation?: string;
      description?: string;
      pages?: number;
      SalePrice?: number;
      "Publication date of first edition"?: Date;
      "Publication date"?: Date;
      "Purchase date"?: Date;
      isDamaged?: boolean;
      "First owner"?: boolean;
      "Limited edition"?: boolean;
      image?: string;
      notes?: string;
   };
   vehicle: {
      model?: string;
      type?: string;
      color?: string;
      "Production Date"?: Date;
      "Purchase date"?: Date;
      manufacturer?: string;
      firstOwner?: boolean;
      "Current Price"?: number;
      fuelType?: string;
   };
   painting: {
      author?: string;
      description?: string;
      image?: string;
      isDamaged?: boolean;
      notes?: string;
      "First Owner"?: boolean;
      "Creation Data"?: Date;
      "Purchase date"?: Date;
   };
   sculpture: {
      author?: string;
   };
   banknot: {
      author?: string;
   };
   clothing: {
      author?: string;
   };
   music: {
      author?: string;
      genre?: string;
      name?: string;
      album?: string;
      "Creation Date"?: Date;
   };
   movies: {
      author?: string;
   };
}

export type Topics = Array<keyof IOptionalFields>;
export type Topic = keyof IOptionalFields;

export type OptionalFieldsByTopic<T extends keyof IOptionalFields> = IOptionalFields[T];

export type OptionalFieldsKeysByTopic<T extends Topic> = Array<keyof OptionalFieldsByTopic<T>>;
export type OptionalFieldsKeyByTopic<T extends Topic> = keyof OptionalFieldsByTopic<T>;

export interface IOptionalField<T extends Topic> {
   fieldName: OptionalFieldsKeyByTopic<T>;
   valueType: string | number | boolean | Date;
   isAdded?: boolean;
}

export interface ICreateItem<T extends Topic = Topic> {
   id: string;
   name: string;
   tags: string[];
   collectionId?: string;
   topic: string;
   optionalFields?: OptionalFieldsByTopic<T>;
}

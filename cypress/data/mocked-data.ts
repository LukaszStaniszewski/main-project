import { ICreateCollection } from "../../client/src/store/collections/collection.types";

export enum optionalFields {
   author = "Brandon Sanderson",
   pages = 1000,
   description = "Test item description",
}

export const collectionWithItem: ICreateCollection = {
   name: "Test Collection",
   topic: "books",
   description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
   owner: {
      _id: "",
      name: "admin",
   },
   image: {
      url: "https://testlink.com",
      imageId: "test234",
   },
   items: [
      {
         id: "234faf",
         name: "Test Item",
         tags: ["test1", "test2"],
         topic: "books",
         optionalFields: optionalFields,
      },
   ],
};

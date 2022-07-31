import { ICreateItem } from "../components/create-item/item-types/itemTypes";
import { ICreateCollection } from "../pages/create-collection/create-collection";
import { IItem } from "../store/items/item.types";
import { ICurrentUser } from "../store/user/user.types";

export const dataToCreateItem: ICreateItem = {
   id: "234faf",
   name: "test",
   tags: ["test1", "test2"],
   collectionId: "11234556424",
   topic: "books",
   optionalFields: {
      author: "Brandon Sanderson",
      pages: 1000,
      description: "test",
   },
};

export const itemCreated = {
   data: [
      {
         _id: "wewewe",
         createdAt: "24-07.2022",
         updatedAt: "24-07.2022 20:25",
         id: "234faf",
         name: "test",
         tags: ["test1", "test2"],
         collectionId: "11234556424",
         topic: "books",
         optionalFields: {
            author: "Brandon Sanderson",
            pages: 1000,
            description: "test",
         },
      },
   ],
};

export const latestItems = {
   data: [
      {
         _id: "wewewe",
         name: "test",
         tags: ["test1", "test2"],
         collectionId: "11234556424",
         createdAt: "24-07.2022",
         collection: "test collection",
         createdBy: "admin",
      },
      {
         _id: "31111",
         name: "test2",
         tags: ["test1", "test2"],
         collectionId: "11234556424",
         createdAt: "24-07.2022",
         collection: "test collection",
         createdBy: "admin",
      },
      {
         _id: "12222",
         name: "test3",
         tags: ["test1", "test2"],
         collectionId: "11234556424",
         createdAt: "24-07-2022",
         collection: "test collection",
         createdBy: "admin",
      },
   ],
};

export const currentUser: ICurrentUser = {
   _id: "12345",
   name: "test",
   status: "active",
   email: "test@test.com",
   role: "user",
   lastLogin: "24-07-2022 14:32",
   sessionId: "1231455435",
};

export const collectionWithItems: ICreateCollection = {
   description: "test description",
   name: "test collection",
   topic: "books",
   owner: {
      _id: "23123143",
      name: "test",
   },
   items: [dataToCreateItem],
};

export const collectionWithItemsAndImage = {
   description: "test description",
   name: "test collection",
   topic: "books",
   owner: {
      _id: "23123143",
      name: "test",
   },
   items: [dataToCreateItem],
   image: {
      url: "https://testlink.com",
      imageId: "test234",
   },
};

export const successMessage = {
   data: {
      message: "yeye it worked!",
   },
};

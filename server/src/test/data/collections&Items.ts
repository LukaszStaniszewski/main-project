import { Types } from "mongoose";
import { IItemCollectionDocument } from "../../models/collection.model";
import { IItemDocument, ILatestItems } from "../../models/item.model";

export const collectionsByUser = [
   {
      _id: "62cd6888b40f6e5844070a24",
      name: "Fantasy books",
      topic: "books",
      description:
         "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      image: { url: "https://i.ibb.co/rGR1F8d/fantasy.jpg", imageId: "5215252" },
      owner: { _id: "62b5de536816d645de842298", name: "admin" },
      createdAt: "12-07-2022 14:26:40",
      updatedAt: "12-07-2022 14:26:40",
   },
   {
      _id: "62fcda64f55a72095c134195",
      name: "wqeqweqweewwe",
      topic: "books",
      description: "qweqweqwewewww",
      image: {
         url: "https://ik.imagekit.io/9rjpvqxqk/cos_DMbFkMGJ2q",
         imageId: "62fcda63088265eb7732103c",
      },
      owner: { _id: "62b5de536816d645de842298", name: "admin" },
      createdAt: "17-08-2022 11:23:58",
      updatedAt: "17-08-2022 11:23:58",
   },
];

export const largestCollections = [
   {
      _id: "62c96daa1e696a1c5ddebb0a",
      name: "mobile",
      topic: "music",
      description:
         "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      image: {
         url: "https://ik.imagekit.io/9rjpvqxqk/manuel-sardo-dZOFaMG-0Q0-unsplash__VuC0bgQh.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1658093953402",
         imageId: "6235230",
      },
      owner: { _id: "62c9632468c3bf23aa55f661", name: "Monica" },
      createdAt: "09-07-2022 13:59:31",
      updatedAt: "09-07-2022 13:59:31",
      itemCount: 15,
   },
   {
      _id: "62c9710f302c5f9ecdaebaba",
      name: "Cars I like",
      topic: "vechicle",
      description:
         "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      image: { url: "https://loremflickr.com/1920/1080/transport", imageId: "4833293" },
      owner: { _id: "62c9638ee059361a0f86cc35", name: "Michael" },
      createdAt: "09-07-2022 14:14:04",
      updatedAt: "09-07-2022 14:14:04",
      itemCount: 14,
   },
   {
      _id: "62c96d8b3b0d75fc444b4328",
      name: "Bespoke",
      topic: "music",
      description:
         "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      image: {
         url: "https://ik.imagekit.io/9rjpvqxqk/sam-moghadam-khamseh-9sfPj0QzOEU-unsplash_-ffrMQphd.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1658093558967",
         imageId: "4148091",
      },
      owner: { _id: "62c9632468c3bf23aa55f661", name: "Monica" },
      createdAt: "09-07-2022 13:59:04",
      updatedAt: "09-07-2022 13:59:04",
      itemCount: 10,
   },
];
export const createCollectionWithItemsInput = {
   name: "Fantasy books",
   topic: "books",
   description: "lorem ipsum",
   image: {
      url: "https://ik.imagekit.io/9rjpvqxqk/cos_fVWIRciMn",
      imageId: "62cb16d16c5f9f85b20f8d91",
   },
   owner: {
      _id: "62b5fa3d0519580368f627a6",
      name: "admin",
   },
   items: [
      {
         id: "5802",
         name: "Rhythm of War",
         tags: ["books", "5802", "fantasy", "Facilitator"],
         topic: "books",
         optionalFields: {
            author: "Brandon Sanderson",
            series: "Stormlight Archive",
            pages: 1280,
            description:
               "After forming a coalition of human resistance against the enemy invasion, Dalinar Kholin and his Knights Radiant have spent a year fighting a protracted, brutal war. Neither side has gained an advantage, and the threat of a betrayal by Dalinar's crafty ally Taravangian looms over every strategic move.",
            image: "https://i.ibb.co/r5YHQJ3/Rytm-Wojny-cz2.jpg",
         },
      },
   ],
};

export const collectionPayload: IItemCollectionDocument = {
   _id: new Types.ObjectId("62cd6888b40f6e5844070a24"),
   name: "Fantasy books",
   topic: "books",
   description: "lorem ipsum",
   image: {
      url: "https://ik.imagekit.io/9rjpvqxqk/cos_fVWIRciMn",
      imageId: "62cb16d16c5f9f85b20f8d91",
   },
   owner: {
      _id: new Types.ObjectId("62b5fa3d0519580368f627a6"),
      name: "admin",
   },
   createdAt: "12-07-2022 14:26:40",
   updatedAt: "12-07-2022 14:26:40",
};

export const collectionResponse = {
   _id: "62cd6888b40f6e5844070a24",
   name: "Fantasy books",
   topic: "books",
   description: "lorem ipsum",
   image: {
      url: "https://ik.imagekit.io/9rjpvqxqk/cos_fVWIRciMn",
      imageId: "62cb16d16c5f9f85b20f8d91",
   },
   owner: {
      _id: "62b5fa3d0519580368f627a6",
      name: "admin",
   },
   createdAt: "12-07-2022 14:26:40",
   updatedAt: "12-07-2022 14:26:40",
};

export const itemPayload: IItemDocument = {
   _id: new Types.ObjectId("62cd6c2dda4f9f38f6c6c61d"),
   id: "5802",
   name: "Rhythm of War",
   tags: ["books", "5802", "fantasy", "Facilitator"],
   collectionId: new Types.ObjectId("62cd6888b40f6e5844070a24"),
   topic: "books",
   createdAt: "12-07-2022 14:42:16",
   updatedAt: "12-07-2022 14:42:16",
   optionalFields: {
      author: "Brandon Sanderson",
      series: "Stormlight Archive",
      pages: 1280,
      description:
         "After forming a coalition of human resistance against the enemy invasion, Dalinar Kholin and his Knights Radiant have spent a year fighting a protracted, brutal war. Neither side has gained an advantage, and the threat of a betrayal by Dalinar's crafty ally Taravangian looms over every strategic move.",
      image: "https://i.ibb.co/r5YHQJ3/Rytm-Wojny-cz2.jpg",
   },
};

export const itemResponse = {
   _id: "62cd6c2dda4f9f38f6c6c61d",
   id: "5802",
   name: "Rhythm of War",
   tags: ["books", "5802", "fantasy", "Facilitator"],
   collectionId: "62cd6888b40f6e5844070a24",
   topic: "books",
   createdAt: "12-07-2022 14:42:16",
   updatedAt: "12-07-2022 14:42:16",
   optionalFields: {
      author: "Brandon Sanderson",
      series: "Stormlight Archive",
      pages: 1280,
      description:
         "After forming a coalition of human resistance against the enemy invasion, Dalinar Kholin and his Knights Radiant have spent a year fighting a protracted, brutal war. Neither side has gained an advantage, and the threat of a betrayal by Dalinar's crafty ally Taravangian looms over every strategic move.",
      image: "https://i.ibb.co/r5YHQJ3/Rytm-Wojny-cz2.jpg",
   },
};

export const itemInput = {
   id: "5802",
   name: "Rhythm of War",
   tags: ["books", "5802", "fantasy", "Facilitator"],
   collectionId: "62cd6888b40f6e5844070a24",
   topic: "books",
   optionalFields: {
      author: "Brandon Sanderson",
      series: "Stormlight Archive",
      pages: 1280,
      description:
         "After forming a coalition of human resistance against the enemy invasion, Dalinar Kholin and his Knights Radiant have spent a year fighting a protracted, brutal war. Neither side has gained an advantage, and the threat of a betrayal by Dalinar's crafty ally Taravangian looms over every strategic move.",
      image: "https://i.ibb.co/r5YHQJ3/Rytm-Wojny-cz2.jpg",
   },
};

export const latestItemsPayload: ILatestItems[] = [
   {
      _id: new Types.ObjectId("62cd6c2dda4f9f38f6c6c61d"),
      name: "Rhythm of War",
      collectionId: new Types.ObjectId("62cd6888b40f6e5844070a24"),
      topic: "books",
      createdAt: "12-07-2022 14:42:16",
   },
   {
      _id: new Types.ObjectId("62cd6bba599da72f682e72ce"),
      name: "Oathbringer",
      collectionId: new Types.ObjectId("62cd6888b40f6e5844070a24"),
      topic: "books",
      createdAt: "12-07-2022 14:40:23",
   },
   {
      _id: new Types.ObjectId("62cd6ac5a395d0f0d7eb9a95"),
      name: "Words of Radiance",
      collectionId: new Types.ObjectId("62cd6888b40f6e5844070a24"),
      topic: "books",
      createdAt: "12-07-2022 14:36:15",
   },
   {
      _id: new Types.ObjectId("62cd69d46314ffb234443be4"),
      name: "The Way of Kings",
      collectionId: new Types.ObjectId("62cd6888b40f6e5844070a24"),
      topic: "books",
      createdAt: "12-07-2022 14:32:08",
   },
   {
      _id: new Types.ObjectId("62cb15fac7b7174246f9e71b"),
      name: "qwewq",
      collectionId: new Types.ObjectId("62cb15f9c7b7174246f9e719"),
      topic: "books",
      createdAt: "10-07-2022 20:09:25",
   },
];

export const modifiedLatestItems: ILatestItems[] = [
   {
      _id: new Types.ObjectId("62cd6c2dda4f9f38f6c6c61d"),
      name: "Rhythm of War",
      collectionId: new Types.ObjectId("62cd6888b40f6e5844070a24"),
      topic: "books",
      createdAt: "12-07-2022 14:42:16",
      collection: "Fantasy books",
      createdBy: "admin",
   },
   {
      _id: new Types.ObjectId("62cd6bba599da72f682e72ce"),
      name: "Oathbringer",
      collectionId: new Types.ObjectId("62cd6888b40f6e5844070a24"),
      topic: "books",
      createdAt: "12-07-2022 14:40:23",
      collection: "Fantasy books",
      createdBy: "admin",
   },
   {
      _id: new Types.ObjectId("62cd6ac5a395d0f0d7eb9a95"),
      name: "Words of Radiance",
      collectionId: new Types.ObjectId("62cd6888b40f6e5844070a24"),
      topic: "books",
      createdAt: "12-07-2022 14:36:15",
      collection: "Fantasy books",
      createdBy: "admin",
   },
   {
      _id: new Types.ObjectId("62cd69d46314ffb234443be4"),
      name: "The Way of Kings",
      collectionId: new Types.ObjectId("62cd6888b40f6e5844070a24"),
      topic: "books",
      createdAt: "12-07-2022 14:32:08",
      collection: "Fantasy books",
      createdBy: "admin",
   },
   {
      _id: new Types.ObjectId("62cb15fac7b7174246f9e71b"),
      name: "qwewq",
      collectionId: new Types.ObjectId("62cb15f9c7b7174246f9e719"),
      topic: "books",
      createdAt: "10-07-2022 20:09:25",
      collection: "Droga Królów",
      createdBy: "maciek",
   },
];

export const latestItemsResponse = [
   {
      _id: "62cd6c2dda4f9f38f6c6c61d",
      name: "Rhythm of War",
      collectionId: "62cd6888b40f6e5844070a24",
      topic: "books",
      createdAt: "12-07-2022 14:42:16",
      collection: "Fantasy books",
      createdBy: "admin",
   },
   {
      _id: "62cd6bba599da72f682e72ce",
      name: "Oathbringer",
      collectionId: "62cd6888b40f6e5844070a24",
      topic: "books",
      createdAt: "12-07-2022 14:40:23",
      collection: "Fantasy books",
      createdBy: "admin",
   },
   {
      _id: "62cd6ac5a395d0f0d7eb9a95",
      name: "Words of Radiance",
      collectionId: "62cd6888b40f6e5844070a24",
      topic: "books",
      createdAt: "12-07-2022 14:36:15",
      collection: "Fantasy books",
      createdBy: "admin",
   },
   {
      _id: "62cd69d46314ffb234443be4",
      name: "The Way of Kings",
      collectionId: "62cd6888b40f6e5844070a24",
      topic: "books",
      createdAt: "12-07-2022 14:32:08",
      collection: "Fantasy books",
      createdBy: "admin",
   },
   {
      _id: "62cb15fac7b7174246f9e71b",
      name: "qwewq",
      collectionId: "62cb15f9c7b7174246f9e719",
      topic: "books",
      createdAt: "10-07-2022 20:09:25",
      collection: "Droga Królów",
      createdBy: "maciek",
   },
];

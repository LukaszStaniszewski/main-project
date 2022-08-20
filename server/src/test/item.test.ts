import supertest from "supertest";
import dotenv from "dotenv";
dotenv.config();

import * as UserService from "../services/user.service";
import * as CollectionService from "../services/collection.service";
import * as ItemService from "../services/item.service";
import * as key from "../config/keyes";
import createExpressServer from "../utils/server";
import { ErrorMessage, SuccessMessage } from "../config/constants.config";
import { signJwt } from "../utils/jtw.utils";
import { userWithAminStatus, user } from "./data/user";
import {
   itemPayload,
   itemResponse,
   itemInput,
   latestItemsResponse,
   latestItemsPayload,
   modifiedLatestItems,
} from "./data/collections&Items";

const app = createExpressServer();

describe("item", () => {
   describe("create item/s", () => {
      describe("given payload is valid", () => {
         it("should return item array and stauts 200", async () => {
            const createItemMock = jest
               .spyOn(ItemService, "createItem")
               .mockResolvedValue([itemPayload]);

            const { body, statusCode } = await supertest(app)
               .post("/api/item/new")
               .send(itemInput);

            expect(statusCode).toBe(200);
            expect(body).toEqual([itemResponse]);
            expect(createItemMock).toBeCalledWith(itemInput);
         });
      });
      describe("given payload is not valid", () => {
         it("should return 404", async () => {
            jest.spyOn(ItemService, "createItem").mockRejectedValue("not found");

            const { statusCode } = await supertest(app).post("/api/item/new");

            expect(statusCode).toBe(404);
         });
      });
   });
   describe("get item", () => {
      describe("given item exist", () => {
         it("should return the item and status 200", async () => {
            const getItemMock = jest
               .spyOn(ItemService, "findItem")
               .mockResolvedValue(itemPayload);

            const { body, statusCode } = await supertest(app).get(
               `/api/item/get/${itemResponse._id}`
            );

            expect(statusCode).toBe(200);
            expect(body).toEqual(itemResponse);
            expect(getItemMock).toBeCalledWith(itemResponse._id);
         });
      });
      describe("given item does not exist", () => {
         it("should return message and 404", async () => {
            const itemId = "1411qdq";
            const getItemMock = jest
               .spyOn(ItemService, "findItem")
               .mockRejectedValue("not found");

            const { body, statusCode } = await supertest(app).get(
               `/api/item/get/${itemId}`
            );

            expect(statusCode).toBe(404);
            expect(body).toEqual({ message: ErrorMessage.GET_ITEM_FAILURE });
            expect(getItemMock).toBeCalledWith(itemId);
         });
      });
   });
   describe("get latest items", () => {
      describe("given items amount exist", () => {
         it("should return items and status 200", async () => {
            const itemsAmount = 5;
            const itemsMock = jest
               .spyOn(ItemService, "findLatestItems")
               .mockResolvedValue(latestItemsPayload);
            const modifiedItemsMock = jest
               .spyOn(ItemService, "assignCollectionNameToItem")
               .mockResolvedValue(modifiedLatestItems);

            const { body, statusCode } = await supertest(app).get(
               `/api/item/${itemsAmount}`
            );

            expect(body).toEqual(latestItemsResponse);
            expect(statusCode).toBe(200);
            expect(itemsMock).toBeCalledWith(itemsAmount);
            expect(modifiedItemsMock).toBeCalledWith(latestItemsPayload);
         });
      });
      describe("given items amount doesn't exist", () => {
         it("should return message and status 404", async () => {
            const itemsAmount = 999999;
            const itemsMock = jest
               .spyOn(ItemService, "findLatestItems")
               .mockRejectedValue("error");

            const { body, statusCode } = await supertest(app).get(
               `/api/item/${itemsAmount}`
            );

            expect(body).toEqual({ message: ErrorMessage.GET_ITEM_FAILURE });
            expect(statusCode).toBe(404);
            expect(itemsMock).toBeCalledWith(itemsAmount);
         });
      });
   });
   describe("delete item/s", () => {
      describe("given items exist and user is authorized to make this action", () => {
         it("should return success message and status 200", async () => {
            const jwt = signJwt(userWithAminStatus, key.privateAccessKey, "10m");
            const deleteItemsMock = jest
               .spyOn(ItemService, "deleteItems")
               .mockResolvedValue(true);
            const findCollectionMock = jest
               .spyOn(CollectionService, "findCollection")
               //@ts-ignore
               .mockResolvedValue({ owner: { name: "admin" } });

            const { body, statusCode } = await supertest(app)
               .post("/api/item/delete")
               .send([itemInput])
               .set("Authorization", `Bearer ${jwt}`);

            expect(statusCode).toBe(200);
            expect(body).toEqual({ message: SuccessMessage.ITEM_DELETED });
            expect(findCollectionMock).toBeCalledWith(itemInput.collectionId);
            expect(deleteItemsMock).toBeCalledWith([itemInput]);
         });
      });
      describe("given user is not authorized to make this acction", () => {
         it("should return 401", async () => {
            const jwt = signJwt(user, key.privateAccessKey, "10m");
            const findCollectionMock = jest
               .spyOn(CollectionService, "findCollection")
               //@ts-ignore
               .mockResolvedValue({ owner: { name: "WrongUser" } });

            const { body, statusCode } = await supertest(app)
               .post("/api/item/delete")
               .send([itemInput])
               .set("Authorization", `Bearer ${jwt}`);

            expect(statusCode).toBe(401);
            expect(body).toEqual({ message: ErrorMessage.NOT_AUTHORIZED });
            expect(findCollectionMock).toBeCalledWith(itemInput.collectionId);
         });
      });
      describe("given collections doesn't exist / payload is not valid", () => {
         it("should return message and 404 status", async () => {
            jest.spyOn(UserService, "authorize").mockResolvedValueOnce(true);
            const deleteItemsMock = jest
               .spyOn(ItemService, "deleteItems")
               .mockRejectedValue("error");

            const { body, statusCode } = await supertest(app)
               .post("/api/item/delete")
               .send(["not", "valid", "input"]);

            expect(statusCode).toBe(404);
            expect(body).toEqual({ message: ErrorMessage.USER_DELETION_FAILURE });
            expect(deleteItemsMock).toBeCalledWith(["not", "valid", "input"]);
         });
      });
   });
});

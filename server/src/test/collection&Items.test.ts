import supertest from "supertest";

import * as CollectionService from "../services/collection.service";
import * as ItemService from "../services/item.service";
import createExpressServer from "../utils/server";
import { ErrorMessage } from "../config/constants.config";
import {
   collectionPayload,
   itemPayload,
   createCollectionWithItemsInput,
   collectionResponse,
   itemResponse,
} from "./data/collections&Items";
import { signJwt } from "../utils/jtw.utils";
import { userWithAminStatus } from "./data/user";
import * as key from "../config/keys";

const app = createExpressServer();

describe("collections&items", () => {
   describe("create collection with items", () => {
      describe("request is send, when user is not logged in", () => {
         it("should return message and status 403", async () => {
            const { statusCode, body } = await supertest(app)
               .post("/api/collection")
               .send(createCollectionWithItemsInput);

            expect(body).toEqual({ message: ErrorMessage.SESSION_EXPIRED });
            expect(statusCode).toBe(403);
         });
      });
      describe("given payload is valid", () => {
         it("should return collection id and status 200", async () => {
            const jwt = signJwt(userWithAminStatus, key.privateAccessKey, "60s");
            const { items, ...collection } = createCollectionWithItemsInput;

            const createCollectionMock = jest
               .spyOn(CollectionService, "createCollection")
               .mockResolvedValue(collectionPayload);
            const createItemMock = jest
               .spyOn(ItemService, "createItem")
               .mockResolvedValue([itemPayload]);

            const { body, statusCode } = await supertest(app)
               .post("/api/collection")
               .send(createCollectionWithItemsInput)
               .set("Cookie", `accessToken=${jwt}`);

            expect(statusCode).toBe(200);
            expect(body).toEqual({ collectionId: collectionResponse._id });
            expect(createCollectionMock).toBeCalledWith(collection);
            expect(createItemMock).toBeCalledWith(items, collectionPayload._id);
         });
      });
      describe("given payload contains not valid collection", () => {
         it("should return 'Collection not created' message and status 409", async () => {
            const jwt = signJwt(userWithAminStatus, key.privateAccessKey, "60s");
            const { items, ...collection } = createCollectionWithItemsInput;

            const createCollectionMock = jest
               .spyOn(CollectionService, "createCollection")
               .mockRejectedValue(ErrorMessage.COLLECTION_NOT_CREATED);

            const { body, statusCode } = await supertest(app)
               .post("/api/collection")
               .send(createCollectionWithItemsInput)
               .set("Cookie", `accessToken=${jwt}`);

            expect(statusCode).toBe(409);
            expect(body).toEqual({ message: ErrorMessage.COLLECTION_NOT_CREATED });
            expect(createCollectionMock).toBeCalledWith(collection);
         });
      });
      describe("given payload contains not valid item/s", () => {
         it("should return 'Item not created' message and status 409", async () => {
            const jwt = signJwt(userWithAminStatus, key.privateAccessKey, "60s");
            const { items, ...collection } = createCollectionWithItemsInput;

            const createCollectionMock = jest
               .spyOn(CollectionService, "createCollection")
               .mockResolvedValue(collectionPayload);
            const createItemMock = jest
               .spyOn(ItemService, "createItem")
               .mockRejectedValue(ErrorMessage.ITEM_NOT_CREATED);

            const { body, statusCode } = await supertest(app)
               .post("/api/collection")
               .send(createCollectionWithItemsInput)
               .set("Cookie", `accessToken=${jwt}`);

            expect(statusCode).toBe(409);
            expect(body).toEqual({ message: ErrorMessage.ITEM_NOT_CREATED });
            expect(createCollectionMock).toBeCalledWith(collection);
            expect(createItemMock).toBeCalledWith(items, collectionPayload._id);
         });
      });
   });
   describe("get collections with items by id", () => {
      describe("given collection exist", () => {
         it("should return the collection and status 200", async () => {
            const findCollectionMock = jest
               .spyOn(CollectionService, "findCollection")
               .mockResolvedValue(collectionPayload);
            const findItemMock = jest
               .spyOn(ItemService, "findItems")
               .mockResolvedValue([itemPayload]);

            const { body, statusCode } = await supertest(app).get(
               `/api/collection/${collectionPayload._id}`
            );

            expect(statusCode).toBe(200);
            expect(body).toEqual({ ...collectionResponse, items: [itemResponse] });
            expect(findCollectionMock).toBeCalledWith(collectionPayload._id.toString());
            expect(findItemMock).toBeCalledWith(collectionPayload);
         });
      });
      describe("given collection doesn't exist", () => {
         it("should return 404", async () => {
            jest.spyOn(CollectionService, "findCollection").mockRejectedValue("error");

            const { statusCode } = await supertest(app).get(
               `/api/collection/${collectionPayload._id}`
            );

            expect(statusCode).toBe(404);
         });
      });
   });
});

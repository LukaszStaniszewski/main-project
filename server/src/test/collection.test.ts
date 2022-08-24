import supertest from "supertest";

import createExpressServer from "../utils/server";
import * as CollectionService from "../services/collection.service";
import { signJwt } from "../utils/jtw.utils";
import * as key from "../config/keys";
import { ErrorMessage, SuccessMessage } from "../config/constants.config";
import { user, userWithAminStatus } from "./data/user";
import { largestCollections, collectionsByUser } from "./data/collections&Items";

const app = createExpressServer();

const userWihoutCollections = "test30";

describe("collection", () => {
   describe("get collections by user", () => {
      describe("given user has collections", () => {
         it("should return the collections and 200 status", async () => {
            const findCollectionsMock = jest
               .spyOn(CollectionService, "findCollectionsByUser")
               //@ts-ignore
               .mockReturnValueOnce(collectionsByUser);

            const { body, statusCode } = await supertest(app).get(
               "/api/collection/user/admin"
            );

            expect(statusCode).toBe(200);
            expect(body).toEqual(collectionsByUser);
            expect(findCollectionsMock).toHaveBeenCalledWith("admin");
         });
      });
      describe("given user doesn't have collections", () => {
         it("should return a 403", async () => {
            const findCollectionsMock = jest
               .spyOn(CollectionService, "findCollectionsByUser")
               .mockRejectedValue(ErrorMessage.USER_HAS_NO_COLLECTIONS);

            const { statusCode, body } = await supertest(app).get(
               `/api/collection/user/${userWihoutCollections}`
            );

            expect(statusCode).toBe(403);
            expect(body).toEqual({ message: ErrorMessage.USER_HAS_NO_COLLECTIONS });
            expect(findCollectionsMock).toHaveBeenCalledWith(userWihoutCollections);
         });
      });
      describe("given user doesn't exist", () => {
         const fakeName = "notExisting1432";

         it("should return 409", async () => {
            const findCollectionsMock = jest
               .spyOn(CollectionService, "findCollectionsByUser")
               .mockRejectedValue(ErrorMessage.USER_NOT_FOUND);

            const { statusCode, body } = await supertest(app).get(
               `/api/collection/user/${fakeName}`
            );

            expect(body).toEqual({ message: ErrorMessage.USER_NOT_FOUND });
            expect(statusCode).toBe(409);
            expect(findCollectionsMock).toHaveBeenCalledWith(fakeName);
         });
      });
   });
   describe("get largest collections", () => {
      describe("given collection amount exists in database", () => {
         it("should return collections and status 200", async () => {
            const findCollectionsMock = jest
               .spyOn(CollectionService, "findLargestCollections")
               //@ts-ignore
               .mockReturnValueOnce(largestCollections);

            const { body, statusCode } = await supertest(app).get(
               "/api/collection/largest/3"
            );
            expect(statusCode).toBe(200);
            expect(body).toEqual(largestCollections);
            expect(findCollectionsMock).toHaveBeenCalledWith(3);
         });
      });
      describe("given collection amount doesn't exist in database", () => {
         it("should return 405", async () => {
            const findCollectionsMock = jest
               .spyOn(CollectionService, "findLargestCollections")
               //@ts-ignore
               .mockRejectedValue("error");

            const { statusCode } = await supertest(app).get(
               "/api/collection/largest/999999"
            );
            expect(statusCode).toBe(405);
            expect(findCollectionsMock).toHaveBeenCalledWith(999999);
         });
      });
   });
   describe("delete collection", () => {
      describe("given collection exist and user is authorized", () => {
         it("should return success message and status 200", async () => {
            const jwt = signJwt(userWithAminStatus, key.privateAccessKey, "10m");

            const mockedDeleteCollection = jest
               .spyOn(CollectionService, "deleteCollection")
               .mockResolvedValue(true);
            jest
               .spyOn(CollectionService, "findCollection")
               // @ts-ignore
               .mockResolvedValue({ owner: { name: userWithAminStatus.name } });

            const { body, statusCode } = await supertest(app)
               .delete(`/api/collection/delete/${collectionsByUser[1]._id}`)
               .set("Authorization", `Bearer ${jwt}`);

            expect(statusCode).toBe(200);
            expect(body).toEqual({ message: SuccessMessage.COLLECTION_DELETED });
            expect(mockedDeleteCollection).toBeCalledWith(collectionsByUser[1]._id);
         });
      });
      describe("given collection exist but user is not authorized", () => {
         it("should return 401", async () => {
            const jwt = signJwt(user, key.privateAccessKey, "10m");

            jest
               .spyOn(CollectionService, "findCollection")
               // @ts-ignore
               .mockResolvedValue({ owner: { name: "differentUser" } });

            const { statusCode } = await supertest(app)
               .delete(`/api/collection/delete/${collectionsByUser[1]._id}`)
               .set("Authorization", `Bearer ${jwt}`);

            expect(statusCode).toBe(401);
         });
      });
   });
});

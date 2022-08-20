import supertest from "supertest";
import dotenv from "dotenv";
dotenv.config();

import * as CommentService from "../services/comment.service";
import * as key from "../config/keyes";
import createExpressServer from "../utils/server";
import {
   commentResponse,
   commentPayload,
   commentInput,
   getCommentsByItemIdInput,
} from "./data/comment";
import { user, unathorizedUser } from "./data/user";
import { ErrorMessage } from "../config/constants.config";
import { signJwt } from "../utils/jtw.utils";

const app = createExpressServer();

describe("comments", () => {
   describe("create comment", () => {
      describe("given payload is valid", () => {
         it("should return comment and status 200", async () => {
            const createCommentMock = jest
               .spyOn(CommentService, "createComment")
               .mockResolvedValue(commentPayload);

            const { statusCode, body } = await supertest(app)
               .post("/api/comment/new")
               .send(commentInput);

            expect(statusCode).toBe(200);
            expect(body).toEqual(commentResponse);
            expect(createCommentMock).toBeCalledWith(commentInput);
         });
         describe("given payload is not valid", () => {
            it("should return message and status 409", async () => {
               jest.spyOn(CommentService, "createComment").mockRejectedValue("error");

               const { statusCode, body } = await supertest(app)
                  .post("/api/comment/new")
                  .send({ name: "faulty payload" });

               expect(statusCode).toBe(409);
               expect(body).toEqual({ message: ErrorMessage.COMMENT_NOT_CREATED });
            });
         });
      });
   });
   describe("get comments by item id", () => {
      describe("given comments exist", () => {
         it("should return comments and status 200", async () => {
            const findCommentsMock = jest
               .spyOn(CommentService, "findComments")
               .mockResolvedValue([commentPayload]);

            const { body, statusCode } = await supertest(app).get(
               `/api/comment/${getCommentsByItemIdInput}`
            );

            expect(statusCode).toBe(200);
            expect(body).toEqual([commentResponse]);
            expect(findCommentsMock).toBeCalledWith({ id: getCommentsByItemIdInput });
         });
      });
      describe("given comments does not exist", () => {
         it("should return 404", async () => {
            jest.spyOn(CommentService, "findComments").mockRejectedValue("error");

            const { statusCode } = await supertest(app).get(`/api/comment/2131452456`);

            expect(statusCode).toBe(404);
         });
      });
   });
   describe("delete comment", () => {
      describe("given user is authorized and comment exist", () => {
         it("should return status 200", async () => {
            const jwt = signJwt(user, key.privateAccessKey, "60s");
            const findCommentsMock = jest
               .spyOn(CommentService, "findComments")
               .mockResolvedValue([commentPayload]);
            const deleteCommentMock = jest
               .spyOn(CommentService, "deleteComment")
               .mockResolvedValue(true);

            const { statusCode } = await supertest(app)
               .delete(`/api/comment/delete/${commentResponse._id}`)
               .set("Authorization", `Bearer ${jwt}`);

            expect(statusCode).toBe(200);
            expect(findCommentsMock).toBeCalledWith({ id: commentResponse._id });
            expect(deleteCommentMock).toBeCalledWith(commentResponse._id);
         });
      });
      describe("given user is not authorized to make this action", () => {
         it("should return message and status 401", async () => {
            const jwt = signJwt(unathorizedUser, key.privateAccessKey, "60s");
            const findCommentsMock = jest
               .spyOn(CommentService, "findComments")
               .mockResolvedValue([commentPayload]);

            const { statusCode, body } = await supertest(app)
               .delete(`/api/comment/delete/${commentResponse._id}`)
               .set("Authorization", `Bearer ${jwt}`);

            expect(statusCode).toBe(401);
            expect(body).toEqual({ message: ErrorMessage.NOT_AUTHORIZED });
            expect(findCommentsMock).toBeCalledWith({ id: commentResponse._id });
         });
      });
      describe("given collection does not exist", () => {
         it("should return 404", async () => {
            const jwt = signJwt(user, key.privateAccessKey, "60s");
            const findCommentsMock = jest
               .spyOn(CommentService, "findComments")
               .mockResolvedValue([commentPayload]);
            const deleteCommentMock = jest
               .spyOn(CommentService, "deleteComment")
               .mockRejectedValue("collection does't exist");

            const { statusCode } = await supertest(app)
               .delete(`/api/comment/delete/${commentResponse._id}`)
               .set("Authorization", `Bearer ${jwt}`);

            expect(statusCode).toBe(404);
            expect(findCommentsMock).toBeCalledWith({ id: commentResponse._id });
            expect(deleteCommentMock).toBeCalledWith(commentResponse._id);
         });
      });
   });
});

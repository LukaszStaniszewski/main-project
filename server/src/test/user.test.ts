import mongoose from "mongoose";
import supertest from "supertest";
import dotenv from "dotenv";
dotenv.config();

import * as UserService from "../services/user.service";
import * as SessionService from "../services/session.service";
import * as key from "../config/keyes";
import createExpressServer from "../utils/server";
import { authenticate } from "../controllers/session.controller";
import { registerAndSignIn } from "../controllers/user.controller";
import { ErrorMessage, Values_TO_Omit } from "../config/constants.config";
import { signJwt } from "../utils/jtw.utils";
import { userWithAminStatus, user, usersToDelete, userInput } from "./data/user";

const userId = new mongoose.Types.ObjectId().toString();
const app = createExpressServer();

const userPayload = {
   _id: userId,
   name: "Jane Doe",
   status: "admin",
};

const sessionPayload = {
   _id: new mongoose.Types.ObjectId().toString(),
   user: userId,
   valid: true,
   createdAt: new Date("2022-08-18T13:31:07.674Z"),
   updatedAt: new Date("2022-08-18T13:31:07.674Z"),
   __v: 0,
};

describe("user", () => {
   describe("user registration", () => {
      describe("given username and email are valid", () => {
         it("should create an user then create session and return accessToken & refresh token", async () => {
            const createUserMock = jest
               .spyOn(UserService, "createUser")
               //@ts-ignore
               .mockReturnValueOnce(userPayload);

            const createSessionMock = jest
               .spyOn(SessionService, "createSession")
               //@ts-ignore
               .mockReturnValue(sessionPayload);

            const req = {
               body: userInput,
            };

            const send = jest.fn();
            const res = {
               send,
            };
            //@ts-ignore
            await registerAndSignIn(req, res);

            expect(send).toHaveBeenCalledWith({
               accessToken: expect.any(String),
               refreshToken: expect.any(String),
            });
            expect(createUserMock).toHaveBeenCalledWith(userInput);
            expect(createSessionMock).toHaveBeenCalledWith(userPayload._id);
         });
      });

      describe("given username and email are not valid", () => {
         it("should return error message and 409", async () => {
            const createUserMock = jest
               .spyOn(UserService, "createUser")
               .mockRejectedValue("error");

            const { statusCode, body } = await supertest(app)
               .post("/api/user/register")
               .send(userInput);

            expect(statusCode).toBe(409);
            expect(body).toEqual({ message: ErrorMessage.EMAIL_OR_PASSWORD_TAKEN });

            expect(createUserMock).toHaveBeenCalledWith(userInput);
         });
      });
   });
   describe("get user", () => {
      describe("given user exist", () => {
         it("should return the user and 200 status", async () => {
            //@ts-ignore
            const getUserMock = jest.spyOn(UserService, "findUser").mockReturnValue(user);

            const { body, statusCode } = await supertest(app).get(
               `/api/user/${user.name}`
            );

            expect(body).toEqual(user);
            expect(statusCode).toBe(200);

            expect(getUserMock).toBeCalledWith(
               { name: user.name },
               Values_TO_Omit.SEND_USERS_REQUEST
            );
         });
      });
      describe("given user doesn't exist", () => {
         it("should return 400 status", async () => {
            //@ts-ignore
            const getUserMock = jest
               .spyOn(UserService, "findUser")
               .mockRejectedValue("user wasn't found");

            const { statusCode } = await supertest(app).get(`/api/user/notExisting5224`);

            expect(statusCode).toBe(400);
            expect(getUserMock).toBeCalledWith(
               { name: "notExisting5224" },
               Values_TO_Omit.SEND_USERS_REQUEST
            );
         });
      });
   });
   describe("delete user/s", () => {
      describe("given user/s exist and user that sends request is authorized", () => {
         it("should return 200 status", async () => {
            const jwt = signJwt(userWithAminStatus, key.privateAccessKey, "10m");
            const deleteUsersMock = jest
               .spyOn(UserService, "deleteUsers")
               .mockResolvedValueOnce(true);
            jest.spyOn(SessionService, "updateUsersSession").mockResolvedValueOnce(true);

            const { statusCode } = await supertest(app)
               .post("/api/user/delete")
               .set("Authorization", `Bearer ${jwt}`)
               .send(usersToDelete);

            expect(statusCode).toBe(200);
            expect(deleteUsersMock).toBeCalledWith(usersToDelete);
         });
      });
      describe("given user sending request is not authorized", () => {
         it("should return 401 and a message", async () => {
            const jwt = signJwt(user, key.privateAccessKey, "10m");

            const { statusCode, body } = await supertest(app)
               .post("/api/user/delete")
               .set("Authorization", `Bearer ${jwt}`)
               .send(usersToDelete);

            expect(statusCode).toBe(401);
            expect(body).toEqual({ message: ErrorMessage.NOT_AUTHORIZED });
         });
      });
      describe("given user/s doesn't exist", () => {
         it("should return 404 and a message ", async () => {
            const jwt = signJwt(userWithAminStatus, key.privateAccessKey, "10m");
            const deleteUsersMock = jest
               .spyOn(UserService, "deleteUsers")
               .mockRejectedValue(false);

            const { statusCode, body } = await supertest(app)
               .post("/api/user/delete")
               .set("Authorization", `Bearer ${jwt}`)
               .send(usersToDelete);

            expect(statusCode).toBe(404);
            expect(body).toEqual({ message: ErrorMessage.USER_DELETION_FAILURE });
            expect(deleteUsersMock).toBeCalledWith(usersToDelete);
         });
      });
   });

   describe("create user session", () => {
      describe("given the username and password are valid", () => {
         it("should return a signed accessToken and refresh token", async () => {
            //@ts-ignore
            jest.spyOn(SessionService, "authentication").mockReturnValue(userPayload);
            //@ts-ignore
            jest.spyOn(SessionService, "createSession").mockReturnValue(sessionPayload);

            const req = {
               get: () => {
                  return "a user aganet";
               },
               body: {
                  email: "test@example.com",
                  password: "Password123",
               },
            };

            const send = jest.fn();

            const res = {
               send,
            };
            //@ts-ignore
            await authenticate(req, res);

            expect(send).toHaveBeenCalledWith({
               accessToken: expect.any(String),
               refreshToken: expect.any(String),
            });
         });
      });
   });
});

import { Request, Response } from "express";

import {
   createUser,
   deleteUsers,
   updateUsers,
   updateUsersSession,
   createSession,
   findUsers,
} from "../services";
import { IUserCredentials, IUserDocument } from "../models/user.model";
import getErrorMessage from "../utils/getErrorMessage";
import logger from "../utils/logger";
import { signJwt } from "../utils/jtw.utils";
import * as key from "../config/keys";
import { ErrorMessage } from "../config/constants.config";

export const registerAndSignIn = async (
   req: Request<{}, {}, IUserCredentials>,
   res: Response
) => {
   try {
      const user = await createUser(req.body);
      const session = await createSession(user._id);

      const accessToken = signJwt(
         { ...user, sessionId: session._id },
         key.privateAccessKey,
         "60s"
      );
      const refreshToken = signJwt(
         { ...user, sessionId: session._id },
         key.privateRefreshKey,
         "30d"
      );

      res.cookie("accessToken", accessToken, {
         maxAge: 900000, // 15min
         httpOnly: true,
         domain: "localhost",
         path: "/",
         sameSite: "strict",
         secure: false,
      });

      res.cookie("refreshToken", refreshToken, {
         maxAge: 3.154e10, // 1year
         httpOnly: true,
         domain: "localhost",
         path: "/",
         sameSite: "strict",
         secure: false,
      });
      if (accessToken && refreshToken) return res.send({ accessToken, refreshToken });
   } catch (error) {
      logger.error(getErrorMessage(error));
      res.status(409).send({ message: ErrorMessage.EMAIL_OR_PASSWORD_TAKEN });
   }
};

export const deleteUserOrUsers = async (
   req: Request<{}, {}, Array<IUserDocument>>,
   res: Response
) => {
   if (res.locals.user.role !== "admin")
      return res.status(401).send({ message: ErrorMessage.NOT_AUTHORIZED });
   try {
      await deleteUsers(req.body);

      await updateUsersSession(req.body, { valid: false });

      res.sendStatus(200);
   } catch (error) {
      logger.error(getErrorMessage(error));
      res.status(404).send({ message: ErrorMessage.USER_DELETION_FAILURE });
   }
};

export const updateUserOrUsers = async (
   req: Request<{}, {}, Array<IUserDocument>>,
   res: Response
) => {
   if (res.locals.user.role !== "admin")
      return res.status(401).send({ message: ErrorMessage.NOT_AUTHORIZED });
   try {
      const isUpdated = await updateUsers(req.body);
      res.sendStatus(200);
   } catch (error) {
      logger.error(getErrorMessage(error));
      res.status(406).send({ message: ErrorMessage.USER_UPDATE_FAILURE });
   }
};

export const sendUsers = async (req: Request, res: Response<Array<IUserDocument>>) => {
   try {
      const users = await findUsers();
      res.send(users);
   } catch (error) {
      logger.error(getErrorMessage(error));
      res.sendStatus(400);
   }
};

export const getCurrentUser = async (req: Request, res: Response) => {
   return res.send(res.locals.user);
};

import { Request, Response } from "express";

import { IUserCredentials } from "../models/user.model";
import { ISessionDocument } from "../models/session.model";
import { authentication, createSession, findSession, updateSession } from "../services";
import { signJwt } from "../utils/jtw.utils";
import * as key from "../config/keys";
import { ErrorMessage } from "../config/constants.config";

export const authenticate = async (
   req: Request<{}, {}, IUserCredentials>,
   res: Response
) => {
   const user = await authentication(req.body);
   if (!user) return res.status(401).send({ message: ErrorMessage.NOT_AUTHENTICATED });
   if (user.status === "blocked")
      return res.status(403).send({ message: ErrorMessage.ACCOUNT_HAS_BLOCKED_STATUS });
   const session = await createSession(user._id);

   const accessToken = signJwt(
      { ...user, sessionId: session._id },
      key.privateAccessKey,
      "60s"
   ); // 60s
   const refreshToken = signJwt(
      { ...user, sessionId: session._id },
      key.privateRefreshKey,
      "30d"
   );
   res.cookie("accessToken", accessToken, {
      maxAge: 900000, // 15min
      httpOnly: true,
      domain: "main-app-collections.herokuapp.com",
      path: "/",
      sameSite: "strict",
      secure: false,
   });

   res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10, // 1year
      httpOnly: true,
      domain: "main-app-collections.herokuapp.com",
      path: "/",
      sameSite: "strict",
      secure: false,
   });

   res.send({ accessToken, refreshToken });
};

export const getUserSessions = async (req: Request, res: Response<ISessionDocument>) => {
   const userId = res.locals?.user?._id;
   try {
      const session = await findSession({ user: userId, valid: true });
      res.send(session);
   } catch (error) {
      res.status(418);
   }
};

export const deleteSessions = async (req: Request, res: Response) => {
   const sessionId = res.locals?.user?.sessionId;
   try {
      const sesstion = await updateSession({ _id: sessionId }, { valid: false });
      return res.status(200).send({
         accessToken: null,
         refreshToken: null,
      });
   } catch (error) {
      res.status(500);
   }
};

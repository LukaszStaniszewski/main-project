import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { deburr } from "lodash";

import { IUserCredentials } from "../models/user.model";
import { ISessionDocument } from "../models/session.model";
import {
   authentication,
   createSession,
   findSession,
   updateSession,
   getGoogleOAuthTokens,
   findAndUpdateUser,
} from "../services";
import { signJwt } from "../utils/jtw.utils";
import * as key from "../config/keys";
import { ErrorMessage } from "../config/constants.config";
import logger from "../utils/logger";

const accessTokenCookieOptions: CookieOptions = {
   maxAge: 900000, // 15min
   httpOnly: true,
   domain: "main-app-collections.herokuapp.com",
   path: "/",
   sameSite: "strict",
   secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
   ...accessTokenCookieOptions,
   maxAge: 3.154e10, // 1year
};

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
      "5min"
   ); // 60s
   const refreshToken = signJwt(
      { ...user, sessionId: session._id },
      key.privateRefreshKey,
      "30d"
   );
   res.cookie("accessToken", accessToken, accessTokenCookieOptions);

   res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

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
      const session = await updateSession({ _id: sessionId }, { valid: false });
      res.clearCookie("accessToken", { domain: process.env.ORIGIN, path: "/" });
      res.clearCookie("refreshToken", { domain: process.env.ORIGIN, path: "/" });
      return res.status(200).send({
         accessToken: null,
         refreshToken: null,
      });
   } catch (error) {
      res.status(500);
   }
};

interface GoogleUserResult {
   email: string;
   email_verified: boolean;
   name: string;
   given_name: string;
   family_name: string;
   picture: string;
   locale: string;
}

export const googleOauthHandler = async (req: Request, res: Response) => {
   try {
      const code = req.query.code as string;

      const { id_token } = await getGoogleOAuthTokens({ code });

      const googleUser = jwt.decode(id_token) as GoogleUserResult;

      if (!googleUser.email_verified) {
         return res.status(403).send("Google account is not verified");
      }

      const name = deburr(googleUser.given_name);

      const user = await findAndUpdateUser(
         { email: googleUser.email },
         {
            email: googleUser.email,
            name: name,
         },
         { upsert: true, new: true }
      );

      const session = await createSession(user?._id!);

      const accessToken = signJwt(
         { ...user, sessionId: session._id },
         key.privateAccessKey,
         "5min"
      );
      const refreshToken = signJwt(
         { ...user, sessionId: session._id },
         key.privateRefreshKey,
         "30d"
      );

      res.cookie("accessToken", accessToken, accessTokenCookieOptions);

      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

      res.redirect(`${process.env.ORIGIN}/user/${user?.name}`);
   } catch (error) {
      logger.error(error, "failed to authorized Google user");
      res.redirect(`${process.env.ORIGIN}/signin`);
   }
};

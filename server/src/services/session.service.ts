import { omit } from "lodash";
import { Types, FilterQuery, UpdateQuery } from "mongoose";
import qs from "qs";
import axios from "axios";

import { IUserDocument } from "../models/user.model";
import SessionModel, { ISessionDocument } from "../models/session.model";
import { findUser } from "./user.service";
import { verifyToken, signJwt } from "../utils/jtw.utils";
import getErrorMessage from "../utils/getErrorMessage";
import { Values_TO_Omit } from "../config/constants.config";
import * as key from "../config/keys";
import logger from "../utils/logger";

export const authentication = async ({
   email,
   password,
}: {
   email: string;
   password: string;
}) => {
   const user = await findUser({ email });

   if (!user) return false;
   const isPasswordValid = await user.comparePasswords(password);

   if (!isPasswordValid) return false;
   await user.updateLastLogin(email);

   return omit(user.toJSON(), ...Values_TO_Omit.USER_LOGGED_IN);
};

export const createSession = async (userId: Types.ObjectId) => {
   const session = await SessionModel.create({ user: userId });
   return session.toJSON();
};

export const findSession = async (query: FilterQuery<ISessionDocument>) => {
   const session: ISessionDocument = await SessionModel.find(query).lean();
   return session;
};

export const updateSession = async (
   query: FilterQuery<ISessionDocument>,
   updateValue: UpdateQuery<ISessionDocument>
) => {
   return await SessionModel.updateOne(query, updateValue);
};

export const updateUsersSession = async (
   usersArray: Array<IUserDocument>,
   updateValue: UpdateQuery<ISessionDocument>
) => {
   try {
      await Promise.all(
         usersArray.map((userToUpdate) => {
            return SessionModel.updateOne({ name: userToUpdate._id }, updateValue);
         })
      );
      return true;
   } catch (error) {
      throw new Error(getErrorMessage(error));
   }
};

export const reIssueAccessToken = async (refreshToken: string) => {
   const { decoded } = verifyToken(refreshToken, key.publicRefreshKey);

   if (!decoded || !decoded.sessionId) return false;

   const session = await SessionModel.findById(decoded.sessionId);

   if (!session || !session.valid) return false;
   const user = await findUser({ _id: session.user });

   if (!user) return false;

   const accessToken = signJwt(
      { ...user, sessionId: session._id },
      key.privateAccessKey,
      "60s"
   );
   return accessToken;
};

interface GoogleTokensResult {
   access_token: string;
   expires_in: Number;
   refresh_token: string;
   scope: string;
   id_token: string;
}

export const getGoogleOAuthTokens = async ({
   code,
}: {
   code: string;
}): Promise<GoogleTokensResult> => {
   const url = "https://oauth2.googleapis.com/token";

   const values = {
      code,
      client_id: key.googleClientId,
      client_secret: key.googleClientSecret,
      redirect_uri: key.googleOauthRedirectUrl,
      grant_type: "authorization_code",
   };

   try {
      const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
         },
      });
      return res.data;
   } catch (error) {
      logger.error(error, "failed to fetch Google Oauth Tokens");
      throw new Error(getErrorMessage(error));
   }
};

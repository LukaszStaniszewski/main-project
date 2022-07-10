import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";
import { ISessionDocument } from "../models/session.model";

import getErrorMessage from "./getErrorMessage";
import logger from "./logger";

export const signJwt = (payload: Object, privateKey: string, options: string) => {

   return jwt.sign(payload, privateKey, {expiresIn: options, algorithm: "RS256"})
}
interface IVerifyToken extends Omit<IUserDocument, "_id">, ISessionDocument {
   _id: string,
   sessionId: string,
   [key: string]: any;
}

export const verifyToken = (token: string, publicKey: string) => {
   try {
      const decoded = jwt.verify(token, publicKey)
      return ({
         isValid: true,
         expired: false,
         decoded: decoded as IVerifyToken
      })
   } catch(error) {
      return ({
         isValid: false,
         expired: true,
         decoded: null,
         message: logger.error(getErrorMessage("jwt-expired"))
      })
   }
}
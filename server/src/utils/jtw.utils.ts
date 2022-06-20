import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";
import { ISessionDocument } from "../models/session.model";

import getErrorMessage from "./getErrorMessage";
import logger from "./logger";

export const signJwt = (payload: Object, privateKey: string, options: string) => {
   // const signingKey = Buffer.from(
   //    privateKey,
   //    "utf8"
   //  )
   //  console.log("signingKey", signingKey)
   return jwt.sign(payload, privateKey, {expiresIn: options, algorithm: "RS256"})
   // return jwt.sign(payload, privateKey, {expiresIn: options})
}


interface IVerifyToken extends Omit<IUserDocument, "_id">, ISessionDocument {
   _id: string,
   sessionId: string,
   [key: string]: any;
}

export const verifyToken = (token: string, publicKey: string) => {
   // add admin verification
   // const publicKeyy = Buffer.from(publicKey, "utf8")
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
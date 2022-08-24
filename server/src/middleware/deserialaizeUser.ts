import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

import { verifyToken } from "../utils/jtw.utils";
import { reIssueAccessToken, updateSession } from "../services/session.service";
import * as key from "../config/keys";
import { ErrorMessage } from "../config/constants.config";

const deserialaizeUser = async (req: Request, res: Response, next: NextFunction) => {
   const accessToken =
      get(req, "cookies.accessToken") ||
      get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
   const refreshToken = get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

   if (!accessToken) return next();

   const { decoded, expired } = verifyToken(accessToken, key.publicAccessKey);
   if (decoded?.status === "blocked") {
      await updateSession({ name: decoded._id }, { valid: false });
      return res.status(403).send({ message: ErrorMessage.ACCOUNT_HAS_BLOCKED_STATUS });
   }
   if (decoded) {
      res.locals.user = decoded;
      return next();
   }
   if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken(refreshToken);
      if (newAccessToken) {
         res.setHeader("x-access-token", newAccessToken);
         const { decoded } = verifyToken(newAccessToken, key.publicAccessKey);
         res.locals.user = { ...decoded?._doc, sessionId: decoded?.sessionId };
         return next();
      }
   }

   next();
};

export default deserialaizeUser;

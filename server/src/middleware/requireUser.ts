import { Request, Response, NextFunction } from "express";
import { ErrorMessage } from "../config/constants.config";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
   const user = res.locals.user;
   if (!user) {
      return res.status(403).send({ message: ErrorMessage.SESSION_EXPIRED });
   }

   return next();
};

export default requireUser;

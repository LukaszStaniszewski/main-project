import { Router } from "express";

import {
   authenticate,
   getUserSessions,
   deleteSessions,
   googleOauthHandler,
} from "../controllers/session.controller";

const sessionRouter = Router();

sessionRouter.post("/", authenticate);
sessionRouter.get("/", getUserSessions);
sessionRouter.delete("/", deleteSessions);
sessionRouter.get("/oauth/google", googleOauthHandler);

export default sessionRouter;

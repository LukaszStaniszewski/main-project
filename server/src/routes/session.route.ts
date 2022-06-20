import { Router } from "express";

import { authenticate ,getUserSessions, deleteSessions } from "../controllers/session.controller";

const sessionRouter = Router()

sessionRouter.post('/', authenticate)
sessionRouter.get('/', getUserSessions)
sessionRouter.delete('/', deleteSessions)

export default sessionRouter
import {Request, Response} from "express"

import { IUserCredentials } from "../models/user.model"
import { ISessionDocument } from "../models/session.model"
import { authorization, createSession, findSession, updateSession} from "../services/session.service"
import { signJwt } from "../utils/jtw.utils"
import * as key from "../config/keyes"


export const authenticate = async (req: Request<{}, {}, IUserCredentials>, res: Response) => {
   const user = await authorization(req.body)
   if(!user) return res.status(401).send({message: "Invalid credentials"})
   if(user.status === "blocked") return res.status(403).send({message: "Your account has been blocked"})
   const session = await createSession(user._id)

   const accessToken = signJwt({...user, sessionId: session._id}, key.privateAccessKey, "60s") // 60s
   const refreshToken = signJwt({...user, sessionId: session._id}, key.privateRefreshKey, "1d")

   res.json({accessToken, refreshToken})
}

export const getUserSessions= async (req: Request, res: Response<ISessionDocument>) => {
   console.log("res.locals.user", res.locals.user)
   const userId = res.locals.user._id
   const session = await findSession({user: userId, valid: true})
   
   res.send(session)
}

export const deleteSessions = async (req: Request, res: Response) => {
   console.log("deleteSessions", res.locals.user)

   const sessionId = res.locals.user.sessionId
   await updateSession({_id: sessionId}, {valid: false})
   console.log("uSession")
   return res.send({
      accessToken: null,
      refreshToken: null,
    });
}
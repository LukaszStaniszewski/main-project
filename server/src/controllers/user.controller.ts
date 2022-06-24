import {Request, Response} from "express"
import { createUser, deleteUsers, updateUsers } from "../services/user.service"
import { updateUsersSession } from "../services/session.service"
import User, { IUserCredentials, IUserDocument} from "../models/user.model"
import getErrorMessage from "../utils/getErrorMessage"
import logger from "../utils/logger"
import { signJwt } from "../utils/jtw.utils"
import * as key from "../config/keyes"
import {createSession} from "../services/session.service"
import { Values_TO_Omit } from "../config/constants.config"


export const registerAndSignIn = async (req: Request<{}, {}, IUserCredentials>, res: Response) => {
   try {
      const user = await createUser(req.body)
      const session = await createSession(user._id)

      const accessToken = signJwt({...user, sessionId: session._id}, key.privateAccessKey, "60s")
      const refreshToken = signJwt({...user, sessionId: session._id}, key.privateRefreshKey, "1d")
   
      res.json({accessToken, refreshToken})
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.status(409).send({error:"Username or Email is taken"})
   }
}

export const deleteUserOrUsers = async (req: Request<{}, {}, Array<IUserDocument>>, res: Response) => {
   if(res.locals.user.role !== "admin") return res.status(401).send({message: "You are not authorized to make this acction"})
   try {
      await deleteUsers(req.body)

      await updateUsersSession(req.body, {valid: false})

      res.sendStatus(200)
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.status(404).send({message: "User/s weren't deleted"})
   }
}

export const updateUserOrUsers = async (req: Request<{}, {},  Array<IUserDocument>>, res: Response) => {
   if(res.locals.user.role !== "admin") return res.status(401).send({message: "You are not authorized to make this acction"})
   try {
       const isUpdated = await updateUsers(req.body)
       res.sendStatus(200)
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.status(406).send({message: "User/s weren't updated"})
   }
}

export const sendUsers = async (req: Request, res: Response< Array<IUserDocument> >) => {
   try {
      const data = await User.find().select(Values_TO_Omit.SEND_USERS_REQUEST)
      res.json(data)
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.sendStatus(400)
   }
}
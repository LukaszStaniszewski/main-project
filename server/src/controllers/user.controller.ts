import {Request, Response} from "express"

import { createUser, deleteUsers, updateUsers } from "../services/user.service"
import { updateUsersSession } from "../services/session.service"
import User, { IUserCredentials, IUserDocument} from "../models/user.model"
import getErrorMessage from "../utils/getErrorMessage"
import logger from "../utils/logger"


export const registerUser = async (req: Request<{}, {}, IUserCredentials>, res: Response) => {
   console.log(req.body)
   try {
      const user = await createUser(req.body)
      res.json(user);
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.sendStatus(409)
   }
}

export const deleteUserOrUsers = async (req: Request<{}, {}, Array<IUserDocument>>, res: Response) => {
   try {
      await deleteUsers(req.body)

      await updateUsersSession(req.body, {valid: false})

      res.status(200).json({message: 'User has been deleted'})
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.sendStatus(404)
   }
}

export const updateUserOrUsers = async (req: Request<{}, {},  Array<IUserDocument>>, res: Response) => {
   try {
       const isUpdated = await updateUsers(req.body)
       res.status(200).json({message: "Users has been updated"})
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.sendStatus(406)
   }
}

export const sendUsers = async (req: Request, res: Response< Array<IUserDocument> >) => {
   try {
      const data = await User.find().select("-password")
      res.json(data)
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.sendStatus(400)
   }
}
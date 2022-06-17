import {Request, Response} from "express"

import { createUser, deleteUsers, updateUsers } from "../services/user.service"
import getErrorMessage from "../utils/getErrorMessage"
import { IUserCredentials, UpdateUserOrUsers } from "../models/user.model"
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

export const deleteUserOrUsers = async (req: Request<{}, {}, UpdateUserOrUsers>, res: Response) => {
   try {
      await deleteUsers(req.body)
      res.status(200).json({message: 'User has been deleted'})
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.sendStatus(404)
   }
}

export const updateUserOrUsers = async (req: Request<{}, {}, UpdateUserOrUsers>, res: Response) => {
   try {
       const isUpdated = await updateUsers(req.body)
       res.status(200).json({message: "Users has been updated"})
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.sendStatus(406)
   }
}
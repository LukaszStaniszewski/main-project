import {Request, Response} from "express"

import { createUser, deleteUsers } from "../services/user.service"
import getErrorMessage from "../utils/getErrorMessage"
import { IUserCredentials } from "../models/user.model"
import logger from "../utils/logger"


export const registerUser = async (req: Request<{}, {}, IUserCredentials>, res: Response) => {
   try {
      const user = await createUser(req.body)
      res.json(user);
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.sendStatus(409)
   }
}

export const deleteUserOrUsers = async (req: Request, res: Response) => {
   try {
      await deleteUsers(req.body)
      res.json({message: 'User has been deleted'})
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.sendStatus(404)
   }
}

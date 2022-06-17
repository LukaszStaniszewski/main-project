import { omit } from "lodash";

import UserModel, {IUserCredentials, UpdateUserOrUsers} from "../models/user.model";
import getErrorMessage from "../utils/getErrorMessage";

export const createUser = async (input: IUserCredentials) => {
   try {
      const user = await UserModel.create(input)
      return omit(user.toJSON(), "password");
   } catch(error) {
      throw new Error(getErrorMessage(error))
   }
}

export const deleteUsers = async(usersArray : UpdateUserOrUsers) => {
   try{
      const user = await UserModel.deleteMany(...usersArray)
      if(user.deletedCount === 0) throw new Error(getErrorMessage("User wasn't deleted"))
      return true
   } catch(error) {
      throw new Error(getErrorMessage(error))
   }  
 }
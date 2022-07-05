import { omit } from "lodash";
import { FilterQuery } from "mongoose";

import User, {IUserCredentials, IUserDocument} from "../models/user.model";
import getErrorMessage from "../utils/getErrorMessage";
import { Values_TO_Omit } from "../config/constants.config";

export const createUser = async (input: IUserCredentials) => {
   try {
      const user = await User.create(input)
      console.log(user)
      return omit(user.toJSON(), ...Values_TO_Omit.USER_LOGGED_IN);
   } catch(error) {
      throw new Error(getErrorMessage(error))
   }
}

export const deleteUsers = async(users : Array<IUserDocument>) => {
   try{
      const user = await User.deleteMany(...users)
      if(user.deletedCount === 0) throw new Error(getErrorMessage("User wasn't deleted"))
      return true
   } catch(error) {
      throw new Error(getErrorMessage(error))
   }  
}

export const updateUsers = async(users: Array<IUserDocument>) => {
   try {
       await Promise.all(users.map(userToUpdate => {
         return User.findByIdAndUpdate(userToUpdate._id, userToUpdate);
       }))
       return true
   } catch(error) {
      throw new Error(getErrorMessage(error))
   }
}

export const findUser = async (query: FilterQuery<IUserDocument>, exclude?: FilterQuery<IUserDocument>) => {
   return await User.findOne(query).select(exclude)
}
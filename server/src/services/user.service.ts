import { omit } from "lodash";
import { FilterQuery } from "mongoose";

import User, {IUserCredentials, IUserDocument} from "../models/user.model";
import getErrorMessage from "../utils/getErrorMessage";

export const createUser = async (input: IUserCredentials) => {
   try {
      const user = await User.create(input)
      console.log(user)
      return omit(user.toJSON(), "password");
   } catch(error) {
      throw new Error(getErrorMessage(error))
   }
}

export const deleteUsers = async(usersArray : Array<IUserDocument>) => {
   try{
      const user = await User.deleteMany(...usersArray)
      if(user.deletedCount === 0) throw new Error(getErrorMessage("User wasn't deleted"))
      return true
   } catch(error) {
      throw new Error(getErrorMessage(error))
   }  
}

export const updateUsers = async(usersArray: Array<IUserDocument>) => {
   try {
       await Promise.all(usersArray.map(userToUpdate => {
         return User.findByIdAndUpdate(userToUpdate._id, userToUpdate);
       }))
       return true
   } catch(error) {
      throw new Error(getErrorMessage(error))
   }
}

export const findUser = async (query: FilterQuery<IUserDocument>) => {
   return await User.findOne(query).select("-password")
}
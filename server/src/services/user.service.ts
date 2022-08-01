import { omit } from "lodash";
import { FilterQuery } from "mongoose";

import User, { IUserCredentials, IUserDocument } from "../models/user.model";
import getErrorMessage from "../utils/getErrorMessage";
import logger from "../utils/logger";
import { Values_TO_Omit } from "../config/constants.config";

export const createUser = async (input: IUserCredentials) => {
   try {
      const user = await User.create(input);
      return omit(user.toJSON(), ...Values_TO_Omit.USER_LOGGED_IN);
   } catch (error) {
      throw new Error(getErrorMessage(error));
   }
};

export const deleteUsers = async (users: Array<IUserDocument>) => {
   try {
      Promise.all(users.map((user) => User.deleteOne(user)));
      return true;
   } catch (error) {
      throw new Error(getErrorMessage(error));
   }
};

export const updateUsers = async (users: Array<IUserDocument>) => {
   try {
      await Promise.all(
         users.map((userToUpdate) => {
            return User.findByIdAndUpdate(userToUpdate._id, userToUpdate);
         })
      );
      return true;
   } catch (error) {
      throw new Error(getErrorMessage(error));
   }
};

export const findUser = async (
   query: FilterQuery<IUserDocument>,
   exclude?: FilterQuery<IUserDocument>
) => {
   try {
      return await User.findOne(query).select(exclude);
   } catch (error) {
      throw new Error(getErrorMessage(error));
   }
};

export const autoCompleteUser = async (query: string) => {
   try {
      const result = await User.aggregate([
         {
            $search: {
               index: "autocompleteUsers",
               autocomplete: {
                  query: query,
                  path: "name",
                  fuzzy: { maxEdits: 1 },
               },
            },
         },
         { $limit: 7 },
         {
            $project: {
               _id: 0,
               value: "$name",
               label: "$name",
            },
         },
      ]);
      return result.map((user) => ({ ...user, label: user.label + " - User" }));
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

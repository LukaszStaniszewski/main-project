import { omit } from "lodash"
import { Types, FilterQuery, UpdateQuery } from "mongoose"

import {IUserDocument} from "../models/user.model"
import SessionModel, {ISessionDocument} from "../models/session.model"
import { findUser } from "./user.service"
import { verifyToken, signJwt } from "../utils/jtw.utils"
import getErrorMessage from "../utils/getErrorMessage"
import { Values_TO_Omit } from "../config/constants.config"
import * as key from "../config/keyes"

export const authentication = async ({email, password}: {email: string, password: string}) => {
   console.log("password", password, "email", email)
  const user = await findUser({email})
  console.log("user", user)
  if(!user) return false
  const isPasswordValid = await user.comparePasswords(password)
  console.log("isPasswordValid", isPasswordValid)
  if(!isPasswordValid) return false
  await user.updateLastLogin(email)

  return omit(user.toJSON(), ...Values_TO_Omit.USER_LOGGED_IN)
}

export const createSession = async (userId : Types.ObjectId) => {
   const session = await SessionModel.create({user: userId})
   return session.toJSON()
}

export const findSession = async (query: FilterQuery<ISessionDocument>) => {
   const session: ISessionDocument = await SessionModel.find(query).lean()
   return session
}

export const updateSession = async (query: FilterQuery<ISessionDocument>, updateValue: UpdateQuery<ISessionDocument>) => {
   return await SessionModel.updateOne(query, updateValue);
}

export const updateUsersSession = async (usersArray: Array<IUserDocument> , updateValue: UpdateQuery<ISessionDocument>) => {
   try {
      await Promise.all(usersArray.map(userToUpdate => {
        return SessionModel.updateOne({name: userToUpdate._id}, updateValue);
      }))
      return true
  } catch(error) {
     throw new Error(getErrorMessage(error))
  }
}

export const reIssueAccessToken = async (refreshToken: string) => {
   const {decoded} = verifyToken(refreshToken, key.publicRefreshKey);

   if (!decoded || !decoded.sessionId) return false

   const session = await SessionModel.findById(decoded.sessionId)

   if(!session || !session.valid) return false
   const user = await findUser({_id: session.user});
   
   if(!user) return false;

   const accessToken = signJwt({...user, sessionId: session._id}, key.privateAccessKey, "60s")
   return accessToken
}
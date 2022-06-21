import {decode} from "jsonwebtoken"
import { ICurrentUser } from "../store/user/user.types"

export const decodeToken = (): any => {
   const token = localStorage.getItem('token')
   if(token) return decode(token)
   localStorage.removeItem("token")
}
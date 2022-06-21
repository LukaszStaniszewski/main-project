import {decode }from "jsonwebtoken"
// import { ICurrentUser } from "../store/user/user.types"

export const decodeToken = (): any => {

   const token = localStorage.getItem('token')
   console.log("token", token)
   if(token && typeof token === "string") return decode(token, {json: true})
   localStorage.removeItem("token")
}
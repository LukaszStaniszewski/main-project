
import { ICurrentUser } from "../store/user/user.types"
import { decodeToken } from "react-jwt";

export const decode = (token: string): ICurrentUser => {

   const decoded: ICurrentUser | null = decodeToken(token)
   if(decoded) return decoded
   throw new Error("invalid token")
}

import { ICurrentUser } from "../store/user/user.types"
import { decodeToken } from "react-jwt";

export const decode = (token: string): ICurrentUser | undefined => {

   const decoded: ICurrentUser | null = decodeToken(token)
   console.log("decoded", decoded)
   if(decoded) return decoded
   throw new Error("invalid token")
}
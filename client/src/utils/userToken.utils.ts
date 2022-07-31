
import { ICurrentUser } from "../store/user/user.types"
import { decodeToken } from "react-jwt";

export const decode = (token: string): ICurrentUser => {
   // storeItem("token", JSON.stringify(token))
   const decoded: ICurrentUser | null = decodeToken(token)
   if(decoded) return decoded
   throw new Error("invalid token")
}


export const storeItem = (key: string, value: string): void => {
   localStorage.setItem(key, value);
   };
   
   export const clearItem = (key: string): void => {
   localStorage.removeItem(key);
   };
   
   export const getItem = (key: string): string | null => {
   return localStorage.getItem(key);
   };
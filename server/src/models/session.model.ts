import { Schema, Types, model } from "mongoose";
import dayjs from "dayjs";
import { IUserDocument } from "./user.model";

export interface ISessionDocument {
   _id: string,
   user: IUserDocument["_id"],
   valid: boolean,
   createdAt: string,
   updatedAt: string,
}

const sessionSchema = new Schema<ISessionDocument>({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User"
   },
   valid: {
      type: Boolean,
      default: true
   },
   createdAt: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm:ss"),
      immutable: true
    },
    updatedAt: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm:ss"),
    },
})

const SessionModel = model<ISessionDocument>("Session", sessionSchema)
export default SessionModel